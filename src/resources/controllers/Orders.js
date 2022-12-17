const { API_Orders, API_Customers } = require('../apis');

const Controller_Order = {
    // 
    // [GET] /admin/orders/storage

    GET_orderStorage: async (req, res, next) => {
        let orders = await API_Orders.readMany({status: 'Đang chờ duyệt'},{});
        // console.log(orders);
        return res.render('pages/orders/storage', {
            layout: 'admin',
            pageName: "Danh sách đơn hàng",
            orders: orders,
            success: req.flash('success') || '',
            error: req.flash('error') || ''
        })
    },

    // [GET] /admin/orders/preview/:id
    GET_orderPreview: async (req, res, next) => {
        const id = req.params.id;
        let order = await API_Orders.readOne({_id: id})
        // console.log(order.product_list)
        return res.render('pages/orders/preview', {
            layout: 'admin',
            pageName: 'Chi tiết hóa đơn',
            order: order
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
    },

    // [GET] /admin/orders/remove/:id
    GET_orderRemove: async (req, res, next) => {
        const id = req.params.id;
        
        return API_Orders.remove(id)
            .then(order => {
                req.flash('success', 'Xóa hóa đơn thành công');
                return res.redirect('/admin/orders/storage');
            })
            .catch(err => {
                req.flash('error', 'Xóa hóa đơn thất bại' + err);
                return res.redirect('/admin/orders/storage');
            })
    },

    // [GET] /admin/orders/history
    GET_orderHistory: async (req, res, next) => {
        let orders = await API_Orders.readMany({status: {$in: ['Hoàn thành', 'Hủy']}}, {})

        return res.render('pages/orders/history', {
            layout: 'admin',
            pageName: 'Lịch sử đơn hàng',
            orders: orders,
            success: req.flash('success') || '',
            error: req.flash('error') || ''
        })
    },

    // [POST] /admin/orders/complete/:id/:status
    POST_orderComplete: async (req, res, next) => {
        const { id, status } = req.body;
        return API_Orders.update(id, {status: status})
            .then(order => {
                req.flash('success', `Đơn hàng đã được ${status}`);
                return res.send(200)
            })
            .catch(err => {
                req.flash('error', 'Hoàn tất đơn hàng thất bại: ' + err);
                return res.send(404)
            })
    }
}

module.exports = Controller_Order;