const BASE_URL = process.env.BASE_URL;
const { uuid } = require('uuidv4');
const { API_Products, API_Customers, API_Orders } = require('../apis');
const { doitacs, introduce, lsCat, lsCartItem, lsSubCat, lsPost, posts, lsProduct } = require('../data/mock');

const Controller_Cart = {
    GET_CartPage: async (req, res, next) => {
        const meta = { title: 'Giỏ hàng', desc: 'Trang chủ H&H Furniture', keywords: 'Homepage, đồ nội thất' };

        return res.render('pages/cart', {
            layout: 'main',
            template: 'khuyen-mai-template',
            meta,
            lsSubCat,
            lsCat,
        });
    },

    POST_AddOrder: async (req, res, next) => {
        // console.log(req.body);
        const { name, email, phone, address, company_name, tax_no, company_address, total, note, lsCartItem } =
            req.body;

        let customer = await API_Customers.readOne({ name, phone })
            .then(async (customer) => {
                if (customer) {
                    return customer;
                } else {
                    return await API_Customers.create({
                        name,
                        email,
                        phone,
                        address,
                        company_name,
                        tax_no,
                        company_address,
                    });
                }
            })
            .catch((err) => {
                console.log(err);
                return res.json({ success: false, msg: err });
            });

        await API_Orders.create({
            order_no: 'ORD' + uuid().slice(0, 7),
            product_list: lsCartItem,
            customer: customer._id,
            total,
            note,
        }).then((order) => {
            return res.json({ success: true, msg: order });
        });
    },
};

module.exports = Controller_Cart;
