const { API_Products } = require('../apis/Products');
const createSlug = require('../utils/createSlug');
const fileapis = require('../middlewares/fileapis');
const BASE_URL = process.env.BASE_URL;

const Products_Controller = {
    // [GET] /products/manager
    GET_managerProduct: (req, res, next) => {
        const error = req.flash('error') || '';
        const success = req.flash('success') || '';
        const page = parseInt(req.query.page) || 1;
        const options = {
            skip: 20 * (page - 1),
            limit: 20,
        };
        const select = {
            pid: 1,
            pname: 1,
            sizes: 1,
            colors: 1,
            prices: 1,
            quantity: 1,
        };

        let products = API_Products.readMany({}, options, select);
        return res.render('manager/productList', {
            layout: 'admin',
            pageName: 'Kho sản phẩm',
            data: products,
            success,
            error,
        });
    },

    // [GET] /products/create
    GET_createProduct: async (req, res, next) => {
        const error = req.flash('error') || '';
        const success = req.flash('success') || '';

        return res.render('pages/products/create', {
            layout: 'admin',
            pageName: 'Thêm sản phẩm',
            success,
            error,
        });
    },

    // [POST] /products/create
    POST_createProduct: async (req, res, next) => {
        const slug = createSlug(req.body.pname, {
            lower: false,
            strict: true,
            remove: false,
            locale: 'vi',
        });

        await API_Products.create({ ...req.body, slug })
            .then(() => {
                req.flash('success', 'Thêm sản phẩm thành công');
                return res.redirect('/products/create');
            })
            .catch((err) => {
                req.flash('error', 'Thêm sản phẩm thất bại: ' + err);
                return res.redirect('/products/create');
            });
    },

    // [DELETE] /products/delete
    DELETE_removeProduct: async (req, res, next) => {
        const id = req.params.id;
        await API_Products.remove(id)
            .then((product) => {
                fileapis.removeDirectory(BASE_URL + product.pid, (err) => {
                    console.log('Thư mục này không còn tồn tại: ' + err);
                });
                req.flash('success', 'Xóa sản phẩm thành công');
                return res.redirect('/manager/products');
            })
            .catch((err) => {
                req.flash('error', 'Xóa sản phẩm thất bại:' + err);
                return res.redirect('/manager/products');
            });
    },
};

module.exports = Products_Controller;
