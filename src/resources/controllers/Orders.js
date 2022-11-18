const { API_Orders } = require('../apis');

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
        const { name, phone, address, email } = req.body;
        
    }
}