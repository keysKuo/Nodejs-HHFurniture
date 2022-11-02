const BASE_URL = process.env.BASE_URL;
const { doitacs, introduce, lsCat, lsSubCat, lsPost, posts, lsProduct } = require('../data/mock');

const Controller_Home = {
    // [GET] /
    GET_Homepage: async (req, res, next) => {
        return res.render('pages/home', {
            layout: 'main',
            template: 'home-template',
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
        return res.render('pages/post', {
            layout: 'main',
            template: 'post-template',
            lsSubCat,
            lsCat,
            lsPost,
        });
    },
    // [GET] /contact
    GET_Contact: async (req, res, next) => {
        return res.render('pages/contact', {
            layout: 'main',
            template: 'contact-template',
            lsSubCat,
            lsCat,
        });
    },
    // [GET] /khuyen-mai
    GET_Sales: async (req, res, next) => {
        return res.render('pages/sales', {
            layout: 'main',
            template: 'khuyen-mai-template',
            lsSubCat,
            lsCat,
            lsProduct,
            posts,
        });
    },
};

module.exports = Controller_Home;
