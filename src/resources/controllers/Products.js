const { API_Products } = require('../apis');
const createSlug = require('../utils/createSlug');
const fileapis = require('../middlewares/fileapis');
const BASE_URL = process.env.BASE_URL;

const Products_Controller = {
    // [GET] /products/manager
    GET_managerProduct: async (req, res, next) => {
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

        let products = await API_Products.readMany({}, options, select);
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
        const files = req.files;
        if(files.length == 0) {
            req.flash('error', 'Vui lòng nhập hình ảnh');
            return res.redirect('/products/create');
        }

        let pimg = files.map(file => {
            return `/uploads/${req.body.pid}/${file.filename}`;
        })

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
                fileapis.removeDirectory(BASE_URL + req.body.pid, err => {
                    console.log('Xóa thư mục thất bại: ' + err);
                });
                req.flash('error', 'Thêm sản phẩm thất bại: ' + err);
                return res.redirect('/products/create');
            });
    },

    // [DELETE] /products/delete/:id
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

    // [GET] /products/update/:id
    GET_updateProduct: async (req, res, next) => {
        const error = req.flash('error') || '';
        const success = req.flash('success') || '';
        const id = req.params.id;

        let product = await API_Products.readOne({_id: id});
        return res.render('manager/update', {
            layout: 'admin',
            pageName: 'Chỉnh sửa sản phẩm',
            data: product,
            error, success
        });
    },

    // [PUT] /products/update/:id
    PUT_updateProduct: async (req, res, next) => {
        const id = req.params.id;
        // const { pid, pname, pimg, material, sizes, colors, prices, discounts, quantity, description, categories, }
        await API_Products.update(id, data)
            .then(product => {

            })
    }
};

module.exports = Products_Controller;
