const { API_Products, API_Category } = require('../apis');
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
} = require('../data/mock');
const mongoose = require('mongoose');

// URLs
const storageURL = '/products/storage';
const createURL = '/products/create';
const updateURL = '/products/update/';
const deleteURL = '/products/delete/';
const previewURL = '/products/preview/';

const Controller_Products = {
    // [GET] /products/storage
    GET_managerProduct: async (req, res, next) => {
        const error = req.flash('error') || '';
        const success = req.flash('success') || '';
        const page = parseInt(req.query.page) || 1;
        const options = {
            skip: 20 * (page - 1),
            limit: 20,
        };

        let products = await API_Products.readMany({}, options);

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

        const categories = await API_Category.readMany({});

        return res.render('pages/products/create', {
            layout: 'admin',
            pageName: 'Thêm sản phẩm',
            categories,
            success,
            error,
        });
    },

    // [POST] /products/create
    POST_createProduct: async (req, res, next) => {
        const files = req.files;
        if (files.length == 0) {
            req.flash('error', 'Vui lòng nhập hình ảnh');
            return res.redirect(createURL);
        }

        let pdir = typeof req.body.pid == 'string' ? req.body.pid : req.body.pid[0];

        let pimg = files.map((file) => {
            return `/uploads/products/${pdir}/${file.filename}`;
        });

        const slug = createSlug(req.body.pname, {
            lower: false,
            strict: true,
            remove: false,
            locale: 'vi',
        });

        await API_Products.create({ ...req.body, pimg, slug })
            .then(() => {
                req.flash('success', 'Thêm sản phẩm thành công');
                return res.redirect(storageURL);
            })
            .catch((err) => {
                fileapis.removeDirectory(BASE_URL + 'products/' + req.body.pid, (err) => {
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
        //console.log(product);
        const categories = await API_Category.readMany({}).then((categories) => {
            categories.forEach((cate1) => {
                product.categories.forEach((cate2) => {
                    if (cate2._id.toString() == cate1._id.toString()) {
                        cate1.check = true;
                    }
                });
            });

            return categories;
        });

        //console.log(categories)

        return res.render('pages/products/update', {
            layout: 'admin',
            pageName: 'Chỉnh sửa sản phẩm',
            data: product,
            error,
            success,
            categories,
        });
    },

    // [POST] /products/update/:id
    POST_updateProduct: async (req, res, next) => {
        const oldPath = req.body.oldpath;
        const pid = req.body.pid;
        const categories = req.body.categories;
        const id = req.params.id;
        const files = req.files;

        let isNewImg = files.length != 0;
        let pdir = typeof pid == 'string' ? pid : pid[0];
        let objCategories =
            typeof categories == 'string'
                ? [new mongoose.Types.ObjectId(categories)]
                : categories.map((c) => mongoose.Types.ObjectId(c));
        let updateImg = !isNewImg
            ? oldPath
            : files.map((file) => {
                  return `/uploads/products/${pdir}/${file.filename}`;
              });

        const data = {
            ...req.body,
            categories: objCategories,
            pimg: updateImg,
        };
        delete data.oldpath;

        await API_Products.update(id, data)
            .then(async (product) => {
                if (isNewImg) {
                    for (path of oldPath) {
                        fileapis.deleteSync('./src/public' + path, (err) => {
                            if (err) {
                                req.flash('error', 'Xóa hình ảnh thất bại: ' + err);
                                return res.redirect(updateURL + id);
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

        let product = await API_Products.readOne({ _id: id });
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
            const product = await API_Products.readOne({ slug: slug });
            
            const meta = { title: product.pname, desc: product.description, keywords: 'Homepage, đồ nội thất' };
            console.log(product.categories);
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
    GET_productDetail: async (req, res, next) => {
        const slug = req.params.slug;

        let product = await API_Products.readOne({slug});
        product.frame = reDistribute(product);
        const meta = { title: product.pname, desc: product.description, keywords: 'Homepage, đồ nội thất' };
        return res.render('pages/products/detail', {
            layout: 'main',
            template: 'san-pham-template',
            lsSubCat,
            lsCat,
            product,
            meta,
            lsProduct,
        });
    },

    // [GET] /products/colection/:slug
    GET_productCollection: async (req, res, next) => {
        const slug = req.params.slug;
        
        let category = await API_Category.readOne({slug: slug});
        let children = await API_Category.readMany({ 'parent': category._id });
        let products = await API_Products.readMany({ 'categories': {$in: []} }, {});
        console.log(children);

    }
};

function reDistribute(product) {
    let groups = new Set(product.sizes);
    let result = [];

    groups.forEach((gr) => {
        let frame = {
            pid: [],
            colors: [],
        };
        for (let i = 0; i < product.sizes.length; i++) {
            if (gr == product.sizes[i]) {
                let rate =
                    product.discounts[i] != 0 ? 100 - parseInt((product.discounts[i] / product.prices[i]) * 100) : 0;

                frame.size = gr;
                frame.price = product.prices[i];
                frame.discount = product.discounts[i];
                frame.pid.push(product.pid[i]);
                frame.colors.push(product.colors[i]);
                frame.rate = rate;
            }
        }
        result.push(frame);
    });
    return result;

}

module.exports = Controller_Products;
