const BASE_URL = process.env.BASE_URL;
const { API_Products } = require('../apis');
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
        console.log(req.body);
    },
};

module.exports = Controller_Cart;
