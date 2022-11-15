const BASE_URL = process.env.BASE_URL;
const { API_Products, API_Category, API_News } = require('../apis');
const {
    doitacs,
    introduce,
    lsCat,
    lsSubCat,
    lsPostProject,
    lsProductByCategory,
    lsProductDiscount,
    lsProductBestSeller,
} = require('../data/mock');
const { getRelation, queryCategories, normalizeData } = require('../utils/categoryUtils');
const createSlug = require('../utils/createSlug');
const reDistribute = require('../utils/reDistribute');
const mongoose = require('mongoose');

// Urls
const createUrl = '/category/create';
const updateUrl = '/category/update/';
const deleteUrl = '/category/delete/';
const storageUrl = '/category/storage';

var category = {
    title: 'Đồ nội thất',
    subCat: [
        { title: 'Combo Tiết Kiệm', href: '/' },

        { title: 'Khuyến Mãi', href: '/' },

        { title: 'Phòng Khách', href: '/' },

        { title: 'Phòng Ăn', href: '/' },

        { title: 'Phòng Ngủ', href: '/' },

        { title: 'Phòng Làm Việc', href: '/' },

        { title: 'Sân Vườn', href: '/' },

        { title: 'Sản Phẩm Khác', href: '/' },
    ],
};
const Controller_Category = {
    // ++++++++++ System Controller +++++++++++
    // /category/storage
    GET_categoryStorage: async (req, res, next) => {
        let level1 = await API_Category.readMany({level: 1});
        let level2 = await API_Category.readMany({level: 2});
        let level3 = await API_Category.readMany({level: 3});
        
        const error = req.flash('error') || '';
        const success = req.flash('success') || '';
    
        return res.render('pages/categories/storage', {
            layout: 'admin',
            pageName: 'Danh mục sản phẩm',
            level1, level2, level3, error, success
        })
    },

    // /category/create
    GET_createCategory: async (req, res, next) => {
        let level1 = await API_Category.readMany({level: 1});
        let level2 = await API_Category.readMany({level: 2});
        let level3 = await API_Category.readMany({level: 3});
        
        const error = req.flash('error') || '';

        return res.render('pages/categories/create', {
            layout: 'admin',
            pageName: 'Thêm danh mục sản phẩm',
            level1, level2, level3, error
        })
    },

    POST_createCategory: async (req, res, next) => {
        const { name, level, level1, level2, level3 } = req.body;
        let data = {
            name: name,
            slug: createSlug(name, {})
        };

        await API_Category.readOne({slug: data.slug})
            .then(cate => {
                if(cate) {
                    data.slug = createSlug(name + ' ' + cate.parent.parent.name, {});
                }
            })

        switch (parseInt(level)) {
            case 1:
                data.level = 1;
                break;
            case 2:
                if(level1 == '') {
                    req.flash('error', 'Vui lòng chọn danh mục cấp 1');
                    return res.redirect(createUrl);
                }
                data.level = 2;
                data.parent = mongoose.Types.ObjectId(level1);
                break;
            case 3:
                if(level2 == '') {
                    req.flash('error', 'Vui lòng chọn danh mục cấp 2');
                    return res.redirect(createUrl);
                }
                data.level = 3;
                data.parent = mongoose.Types.ObjectId(level2);
                break;
            default:
                req.flash('error', 'Vui lòng chọn cấp danh mục');
                return res.redirect(createUrl);
        }

        await API_Category.create(data)
            .then(category => {
                req.flash('success', 'Tạo danh mục thành công');
                return res.redirect(storageUrl);
            })
            .catch(err => {
                req.flash('error', 'Tạo danh mục thất bại: ' + err);
                return res.redirect(createUrl);
            })
    },

    AJAX_POST_filterCategory: async (req, res, next) => {
        const { level1_id } = req.body;
        if(level1_id == '') {
            return res.send(500)
        }
        let level2 = await API_Category.readMany({parent: level1_id}, {});
        let html = `<option value=''>Chọn danh mục...</option>`;
        if(level2.length != 0) {
            level2.forEach(item => {
                html += `<option value='${item._id}'>${item.name}</option>`
            })
        }
        
        return res.send(html);
    },

    POST_removeCategory: async (req, res, next) => {
        let id = req.params.id;

        await API_Category.remove(id)
            .then(async category => {
                let idList = await API_Category.readMany({parent: category._id});
                await API_Category.removeMany(idList);
                req.flash('success', 'Xoá danh mục thành công');
                return res.redirect(storageUrl);
            })
            .catch(err => {
                req.flash('error', 'Xoá danh mục thất bại');
                return res.redirect(storageUrl);
            })
    },

    // ++++++++++ Client Controller +++++++++++

    // [GET] /danh-muc-san-pham/do-noi-that
    GET_CategoryPage: async (req, res, next) => {
        if (req.params.slug) {
            // Query category
            let category = await API_Category.readOne({ slug: req.params.slug });

            const page = parseInt(req.query.page) || 1;
            let query = '';
            switch (category.level) {
                case 1:
                    query = { 'categories.level1.id': category._id };
                    break;
                case 2:
                    query = { 'categories.level2.id': category._id };
                    break;
                case 3:
                    query = { 'categories.level3.id': category._id };
                    break;
                default:
                    break;
            }

            // Query lsProductByCategory
            let lsProductByCategory = await API_Products.readMany(
                { $and: [query, { 'classify.rate': { $gt: -1 } }] },
                { limit: 12, skip: 12 * (page - 1), select: { categories: 0, description: 0 } },
            ).then((products) => {
                return products.map((product) => {
                    return {
                        pname: product.pname,
                        pimg: product.pimg[0],
                        slug: product.slug,
                        price: product.classify[0].price,
                        discount: product.classify[0].discount,
                        rate: Math.max(...product.classify.map((c) => c.rate)),
                    };
                });
            });

            // Query lsProductDiscount
            let lsProductDiscount = await API_Products.readMany(
                { $and: [query, { 'classify.rate': { $gt: 0 } }] },
                { limit: 6, select: { categories: 0, description: 0 } },
            ).then((products) => {
                return normalizeData(products);
            });

            // Query lsProductBestSeller
            let lsProductBestSeller = await API_Products.readMany(
                { $and: [query, { 'classify.rate': { $gt: 0 } }] },
                { limit: 6, select: { categories: 0, description: 0 } },
            ).then((products) => {
                return normalizeData(products);
            });

            // Query lsPostProject
            let lsPostProject = await API_News.readMany({}, { limit: 4 }).then((posts) => {
                return posts.map((post) => {
                    return {
                        title: post.title,
                        slug: post.slug,
                        img: post.images[0],
                    };
                });
            });

            const meta = { title: category.name, desc: 'Trang chủ H&H Furniture', keywords: 'Homepage, đồ nội thất' };
            return res.render('pages/category', {
                layout: 'main',
                template: 'category-template',
                meta,
                lsSubCat,
                lsCat,
                pagination: {
                    page: page, // The current page the user is on
                    pageCount: 12, // The total number of available pages
                },
                // BE trả về
                category: category, // done
                lsProductByCategory, // done
                lsProductDiscount, // done
                lsProductBestSeller, // done
                lsPostProject, // done
                ///////////s
            });
        }
    },
};

module.exports = Controller_Category;
