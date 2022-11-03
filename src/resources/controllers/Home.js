const BASE_URL = process.env.BASE_URL;
const { doitacs, introduce, lsCat, lsCart, lsSubCat, lsPost, posts, lsProduct } = require('../data/mock');

const Controller_Home = {
    // [GET] /
    GET_Homepage: async (req, res, next) => {
        const meta = { title: 'Trang chủ', desc: 'Trang chủ H&H Furniture', keywords: 'Homepage, đồ nội thất' };

        return res.render('pages/home', {
            layout: 'main',
            template: 'home-template',
            meta,
            lsSubCat,
            lsCat,
            lsProduct,
            doitacs,
            posts,
            introduce,
        });
    },
    // [GET] /ban-tin
    GET_News: async (req, res, next) => {
        const meta = { title: 'Bản tin', desc: 'Trang chủ H&H Furniture', keywords: 'Homepage, đồ nội thất' };

        return res.render('pages/post', {
            layout: 'main',
            template: 'post-template',
            meta,
            lsSubCat,
            lsCat,
            lsPost,
        });
    },
    // [GET] /contact
    GET_Contact: async (req, res, next) => {
        const meta = { title: 'Liên hệ', desc: 'Trang chủ H&H Furniture', keywords: 'Homepage, đồ nội thất' };
        return res.render('pages/contact', {
            layout: 'main',
            template: 'contact-template',
            meta,
            lsSubCat,
            lsCat,
        });
    },
    // [GET] /khuyen-mai
    GET_Sales: async (req, res, next) => {
        const meta = { title: 'Khuyến mãi', desc: 'Trang chủ H&H Furniture', keywords: 'Homepage, đồ nội thất' };

        return res.render('pages/sales', {
            layout: 'main',
            template: 'khuyen-mai-template',
            lsSubCat,
            lsCat,
            meta,
            lsProduct,
            posts,
        });
    },
    GET_CartPage: async (req, res, next) => {
        const meta = { title: 'Giỏ hàng', desc: 'Trang chủ H&H Furniture', keywords: 'Homepage, đồ nội thất' };

        return res.render('pages/cart', {
            layout: 'main',
            template: 'khuyen-mai-template',
            meta,
            lsSubCat,
            lsCat,
            lsCart,
        });
    },
};

module.exports = Controller_Home;
