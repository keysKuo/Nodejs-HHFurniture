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
const reDistribute = require('../utils/reDistribute');

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

    // /category/create
    GET_createCategory: async (req, res, next) => {
        let level1 = await API_Category.readMany({level: 1})
            .then(items => {
                return items.map(item => {
                    return {
                        _id: item._id,
                        name: item.name,
                        children: [],
                        grands: []
                    }
                })
            })
        await API_Category.readMany({level: 2})
            .then(items => {
                items.forEach(item => {
                    for(let i = 0; i < level1.length; i++) {
                        if(item.parent._id.toString() == level1[i]._id.toString()) {
                            level1[i].children.push({
                                _id: item._id,
                                name: item.name
                            })
                        }
                    }
                })
            })
        
        await API_Category.readMany({level: 3})
            .then(items => {
                items.forEach(item => {
                    for(let i = 0; i < level1.length; i++) {
                        if(item.parent.parent._id.toString() == level1[i]._id.toString()) {
                            level1[i].grands.push({
                                _id: item._id,
                                name: item.name,
                                parent: item.parent
                            })
                        }
                    }
                })
            })
        
        // return res.json({level1});
        return res.render('pages/categories/create', {
            layout: 'admin',
            categories: level1
        })
    },

    POST_filterCategory: async (req, res, next) => {
        const { level1 , level2 } = req.body;
        let query = {$and: [{level: 3}, {'parent._id': level2}, {'parent.parent._id': level1}]};
        let categories = await API_Category.readMany(query, {});
        return res.json({categories});
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
