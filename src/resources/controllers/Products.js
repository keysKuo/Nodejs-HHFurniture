const { API_Products, API_Category } = require('../apis');
const createSlug = require('../utils/createSlug');
const fileapis = require('../middlewares/fileapis');
require('dotenv').config();
const BASE_URL = process.env.BASE_URL;
const { lsCat, lsSubCat, product } = require('../data/mock');

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
            return res.redirect('/products/create');
        }

        let pdir = typeof req.body.pid == 'string' ? req.body.pid : req.body.pid[0];

        let pimg = files.map((file) => {
            return `/uploads/${pdir}/${file.filename}`;
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
                return res.redirect('/products/create');
            })
            .catch((err) => {
                fileapis.removeDirectory(BASE_URL + req.body.pid, (err) => {
                    console.log('Xóa thư mục thất bại: ' + err);
                });
                req.flash('error', 'Thêm sản phẩm thất bại: ' + err);
                return res.redirect('/products/create');
            });
    },

    // [GET] /products/delete/:id
    GET_removeProduct: async (req, res, next) => {
        const id = req.params.id;

        await API_Products.remove(id)
            .then((product) => {
                let pdir = typeof product.pid == 'string' ? product.pid : product.pid[0];
                fileapis.removeDirectory(BASE_URL + pdir, (err) => {
                    console.log('Thư mục này không còn tồn tại: ' + err);
                });
                req.flash('success', 'Xóa sản phẩm thành công');
                return res.redirect('/products/storage');
            })
            .catch((err) => {
                req.flash('error', 'Xóa sản phẩm thất bại:' + err);
                return res.redirect('/products/storage');
            });
    },

    // [GET] /products/update/:id
    GET_updateProduct: async (req, res, next) => {
        const error = req.flash('error') || '';
        const success = req.flash('success') || '';
        const id = req.params.id;

        let product = await API_Products.readOne({ _id: id });

        const categories = await API_Category.readMany({}).then((categories) => {
            categories.forEach((cate1) => {
                product.categories.forEach((cate2) => {
                    cate1.check = cate2._id.toString() == cate1._id.toString();
                });
            });

            return categories;
        });

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
        const {
            pid,
            pname,
            material,
            colors,
            sizes,
            prices,
            feature,
            categories,
            discounts,
            description,
            quantity,
            oldpath,
        } = req.body;
        const id = req.params.id;
        const files = req.files;
        let pimg;
        let isNewImg = files.length != 0;

        let pdir = typeof pid == 'string' ? pid : pid[0];

        if (!isNewImg) {
            pimg = oldpath;
        } else {
            pimg = files.map((file) => {
                return `/uploads/${pdir}/${file.filename}`;
            });
        }

        const data = {
            pname,
            material,
            categories,
            feature,
            pid,
            sizes,
            colors,
            prices,
            discounts,
            quantity,
            pimg,
            description,
        };

        await API_Products.update(id, data)
            .then(async (product) => {
                if (isNewImg) {
                    for (path of oldpath) {
                        fileapis.deleteSync('./src/public' + path, (err) => {
                            if (err) {
                                console.log('Xóa hình ảnh thất bại: ' + err);
                            }
                        });
                    }
                }

                req.flash('success', 'Chỉnh sửa sản phẩm thành công');
                return res.redirect(`/products/update/${id}`);
            })
            .catch((err) => {
                if (isNewImg) {
                    for (path of pimg) {
                        fileapis.deleteSync('./src/public' + path, (err) => {
                            if (err) {
                                console.log('Xóa hình ảnh thất bại: ' + err);
                            }
                        });
                    }
                }
                req.flash('error', 'Chỉnh sửa sản phẩm thất bại' + err);
                return res.redirect(`/products/update/${id}`);
            });
    },

    // [GET] /products/preview/:id
    GET_previewProduct: async (req, res, next) => {
        const id = req.params.id;

        let product = await API_Products.readOne({ _id: id });
        console.log(product);
        return res.render('pages/products/preview', {
            layout: 'admin',
            pageName: 'Preview sản phẩm',
            data: product,
        });
    },

    // [GET] /products/:slug
    GET_productPage: async (req, res, next) => {
        if (req.params.slug) {
            const meta = { title: product.title, desc: product.desc, keywords: 'Homepage, đồ nội thất' };
            return res.render('pages/product', {
                layout: 'main',
                template: 'san-pham-template',
                lsSubCat,
                lsCat,
                product,
                meta,
            });
        }
    },
};

module.exports = Controller_Products;
