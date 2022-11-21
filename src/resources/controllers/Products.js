const { API_Products, API_Category, API_News } = require('../apis');
const createSlug = require('../utils/createSlug');
const fileapis = require('../middlewares/fileapis');
require('dotenv').config();
const BASE_URL = process.env.BASE_URL;

const {
    lsCat,
    lsSubCat,
    lsProductRelated,
    lsProductDiscount,
    lsProductBestSeller,
    lsPostProject,
    product,
} = require('../data/mock');
const mongoose = require('mongoose');
const reDistribute = require('../utils/reDistribute');
const { getRelation, normalizeData, rollBackArr } = require('../utils/categoryUtils');

// URLs
const storageURL = '/admin/products/storage';
const createURL = '/admin/products/create';
const updateURL = '/admin/products/update/';
const deleteURL = '/admin/products/delete/';
const previewURL = '/admin/products/preview/';

const Controller_Products = {
    // [GET] /products/storage
    GET_managerProduct: async (req, res, next) => {
        const error = req.flash('error') || '';
        const success = req.flash('success') || '';
        const page = parseInt(req.query.page) || 1;
        const options = {
            skip: 20 * (page - 1),
            limit: 20,
            select: {
                description: 0,
                categories: 0,
                material: 0,
            },
        };

        let products = await API_Products.readMany({}, options).then((products) => {
            return products.map((product) => {
                return {
                    ...product,
                    classify: rollBackArr(product.classify),
                };
            });
        });

        //console.log(products)
        return res.render('pages/products/storage', {
            layout: 'admin',
            pageName: 'Kho sản phẩm',
            products: products,
            success,
            error,
        });
    },

    // [GET] /products/create
    GET_createProduct: async (req, res, next) => {
        const error = req.flash('error') || '';
        const success = req.flash('success') || '';

        const categories = await API_Category.readMany({ level: 1 });

        return res.render('pages/products/create', {
            layout: 'admin',
            pageName: 'Thêm sản phẩm',
            level1: categories,
            success,
            error,
        });
    },

    // [POST] /products/create
    POST_createProduct: async (req, res, next) => {
        //return res.json({data: JSON.parse(req.docx)})
        let data = JSON.parse(req.docx);
        let slug = createSlug(data.pname, {});
        let classify = reDistribute(data);
        let categories = await API_Category.readMany({ _id: { $in: data.cateList } }).then((items) => {
            return items.map((item) => {
                return getRelation(item);
            });
        });

        await API_Products.create({ ...data, classify, categories, slug })
            .then(() => {
                req.flash('success', 'Thêm sản phẩm thành công');
                return res.redirect(storageURL);
            })
            .catch((err) => {
                fileapis.removeDirectory(BASE_URL + 'products/' + data.pdir, (err) => {
                    console.log('Xóa thư mục thất bại: ' + err);
                });
                req.flash('error', 'Thêm sản phẩm thất bại: ' + err);
                return res.redirect(createURL);
            });
    },

    // [GET] /products/delete/:id
    GET_removeProduct: async (req, res, next) => {
        const id = req.params.id;

        await API_Products.remove(id)
            .then((product) => {
                let pdir = typeof product.pid == 'string' ? product.pid : product.pid[0];
                fileapis.removeDirectory(BASE_URL + 'products/' + pdir, (err) => {
                    console.log('Thư mục này không còn tồn tại: ' + err);
                });
                req.flash('success', 'Xóa sản phẩm thành công');
                return res.redirect(storageURL);
            })
            .catch((err) => {
                req.flash('error', 'Xóa sản phẩm thất bại:' + err);
                return res.redirect(storageURL);
            });
    },

    // [GET] /products/update/:id
    GET_updateProduct: async (req, res, next) => {
        const error = req.flash('error') || '';
        const success = req.flash('success') || '';
        const id = req.params.id;

        let product = await API_Products.readOne({ _id: id });
        let cateArr = product.categories.map((cate) => {
            return cate.level3.id;
        });

        let dataArr = rollBackArr(product.classify);
        const currCategories = await API_Category.readMany({ _id: { $in: cateArr } });
        const level1 = await API_Category.readMany({ level: 1 });
        //console.log(categories)
        //return res.json({data: dataArr})

        return res.render('pages/products/update', {
            layout: 'admin',
            pageName: 'Chỉnh sửa sản phẩm',
            data: product,
            dataArr,
            cateArr,
            level1,
            error,
            success,
            currCategories,
        });
    },

    // [POST] /products/update/:id
    POST_updateProduct: async (req, res, next) => {
        // return res.json({data: JSON.parse(req.docx)})
        const id = req.params.id;
        const files = req.files;
        let data = JSON.parse(req.docx);
        let isNewImg = files.length != 0;

        data.categories = await API_Category.readMany({ _id: { $in: data.cateList } }).then((items) => {
            return items.map((item) => {
                return getRelation(item);
            });
        });

        data.pimg = !isNewImg ? data.oldpath : data.pimg;

        data.classify = reDistribute(data);

        return await API_Products.update(id, data)
            .then(async (product) => {
                if (isNewImg) {
                    for (path of data.oldpath) {
                        fileapis.deleteSync('./src/public' + path, (err) => {
                            if (err) {
                                console.log(err);
                            }
                        });
                    }
                }
                req.flash('success', 'Chỉnh sửa sản phẩm thành công');
                return res.redirect(updateURL + id);
            })
            .catch((err) => {
                if (isNewImg) {
                    for (path of data.pimg) {
                        fileapis.deleteSync('./src/public' + path, (err) => {
                            if (err) {
                                console.log('Xóa hình ảnh thất bại: ' + err);
                            }
                        });
                    }
                }
                req.flash('error', 'Chỉnh sửa sản phẩm thất bại' + err);
                return res.redirect(updateURL + id);
            });
    },

    // [GET] /products/preview/:id
    GET_previewProduct: async (req, res, next) => {
        const id = req.params.id;

        let product = await API_Products.readOne({ _id: id }).then((product) => {
            return {
                ...product,
                classify: rollBackArr(product.classify),
            };
        });
        //console.log(product);
        return res.render('pages/products/preview', {
            layout: 'admin',
            pageName: 'Preview sản phẩm',
            data: product,
        });
    },
    //      ++++++++++++      Client Controller  ++++++++++++               //

    // [GET] /san-pham/:slug
    GET_productDetail: async (req, res, next) => {
        const slug = req.params.slug;
        if (slug) {
            let product = await API_Products.readOne({ slug });
            let queryCate = product.categories.map((cate) => cate.level3.id);

            let lsProductRelated = await API_Products.readMany(
                { 'categories.level3.id': { $in: queryCate } },
                { limit: 12, select: { description: 0, categories: 0 } },
            ).then((products) => {
                return normalizeData(products);
            });

            let lsProductDiscount = await API_Products.readMany(
                { $and: [{ 'categories.level3.id': { $in: queryCate } }, { 'classify.rate': { $gt: 0 } }] },
                { limit: 6, select: { description: 0, categories: 0 } },
            ).then((products) => {
                return normalizeData(products);
            });

            let lsProductBestSeller = await API_Products.readMany(
                { $and: [{ 'categories.level3.id': { $in: queryCate } }, { 'classify.rate': { $gt: 0 } }] },
                { limit: 6, select: { description: 0, categories: 0 } },
            ).then((products) => {
                return normalizeData(products);
            });

            let lsPostProject = await API_News.readMany({}, { limit: 4 }).then((posts) => {
                return posts.map((post) => {
                    return {
                        title: post.title,
                        slug: post.slug,
                        img: post.images[0],
                    };
                });
            });
            // return res.json({ data: lsPostProject });
            const meta = { title: product.pname, desc: product.description, keywords: 'Homepage, đồ nội thất' };
            return res.render('pages/product', {
                layout: 'main',
                template: 'san-pham-template',
                lsSubCat,
                lsCat,
                meta,

                // BE trả về
                product,
                lsProductRelated,
                lsProductDiscount,
                lsProductBestSeller,
                lsPostProject,
                /////////
            });
        }
    },

    // [GET] /products/:slug
    // GET_productDetail: async (req, res, next) => {
    //     const slug = req.params.slug;

    //     let product = await API_Products.readOne({ slug });
    //     // product.frame = reDistribute(product);
    //     const meta = { title: product.pname, desc: product.description, keywords: 'Homepage, đồ nội thất' };
    //     return res.render('pages/products/detail', {
    //         layout: 'main',
    //         template: 'san-pham-template',
    //         lsSubCat,
    //         lsCat,
    //         product,
    //         meta,
    //         lsProduct,
    //     });
    // },

    // [GET] /products/colection/:slug
    GET_productCollection: async (req, res, next) => {
        const slug = req.params.slug;

        let category = await API_Category.readOne({ slug: slug });
        let children = await API_Category.readMany({ parent: category._id });
        let products = await API_Products.readMany({ categories: { $in: [] } }, {});
        console.log(children);
    },

    // [GET] /products/search?key=...
    GET_findProduct: async (req, res, next) => {
        const page = parseInt(req.query.page) || 1;
        const key = req.query.key || '';
        const meta = {
            title: 'Search',
            desc: 'Trang chủ H&H Furniture',
            keywords: 'Homepage, đồ nội thất',
        };

        let products;
        if (key) {
            let regex = { $regex: key, $options: 'i' };
            let options = {
                limit: 12,
                skip: 12 * (page - 1),
                select: {
                    description: 0,
                    categories: 0,
                },
            };

            products = await API_Products.readMany(
                {
                    $or: [{ pname: regex }, { pid: regex }],
                },
                options,
            );
        } else {
            return res.redirect('/');
        }

        // return res.json({data: products});
        return res.render('pages/searchProduct', {
            layout: 'main',
            template: 'search-template',
            meta,
            lsSubCat,
            lsCat,
            lsProductSearch: products,
            pagination: {
                page: page, // The current page the user is on
                pageCount: 12, // The total number of available pages
            },
        });
    },
};

module.exports = Controller_Products;
