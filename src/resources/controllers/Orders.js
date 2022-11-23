const { API_Orders, API_Customers } = require('../apis');

const Controller_Order = {
    // 
    // [GET] /admin/orders/storage

    GET_orderStorage: async (req, res, next) => {
        let orders = await API_Orders.readMany({},{});
        
        return res.render('pages/orders/storage', {
            layout: 'admin',
            orders: orders
        })
    },

    // [GET] /admin/orders/create

    GET_orderCreate: async (req, res, next) => {
        return res.render('pages/orders/create', {
            error: req.flash('error') || '',
            layout: 'admin'
        })
    },

    // [POST] /admin/orders/create
    POST_orderCreate: async (req, res, next) => {
        const { name, phone, address, email, company_name, company_address, tax_no, note } = req.body;
        const product_list = req.session.product_list || [];
        const total = req.session.total || 0;
        
        return await API_Customers.create({name, phone, address, email, company_name, company_address, tax_no})
            .then(async customer => {
                let order_no = await API_Orders.count();
                return await API_Orders.create({order_no, product_list, customer:customer._id, total, note})
                    .then(order => {
                        req.flash('success', 'Đặt hàng thành công');
                        return res.redirect('/chi-tiet-don-hang');
                    })
                    .catch(err => {
                        req.flash('error', 'Vui lòng nhập đủ thông tin khách hàng (*)');
                        return res.redirect('/thanh-toan');
                    })
            })
            .catch(err => {
                req.flash('error', 'Vui lòng nhập đủ thông tin khách hàng (*)');
                return res.redirect('/thanh-toan');
            })
        
        
    }
}