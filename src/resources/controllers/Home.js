const BASE_URL = process.env.BASE_URL;
const { API_Products, API_News, API_Category } = require('../apis');
const {
    doitacs,
    introduce,
    lsCat,
    lsCart,
    lsSubCat,
    lsPostNews,
    lsPostProject,
    lsProductDoNoiThat,
    lsProductThietBiVeSinh,
    lsProductDenTrangTri,
    lsProductDoTrangTri,
    lsProductSearch,
    policy,
    lsCartItem,
} = require('../data/mock');
const { normalizeData } = require('../utils/categoryUtils');

const Controller_Home = {
    // [GET] /
    GET_Homepage: async (req, res, next) => {
        const meta = {
            title: 'Trang chủ – H&H Furniture',
            desc: 'Trang chủ H&H Furniture',
            keywords: 'Homepage, đồ nội thất',
        };

        const options = {
            limit: 12,
            select: {
                description: 0,
                categories: 0,
            },
        };

        let lsProductDoNoiThat = await API_Products.readMany({ 'categories.level1.name': 'Đồ nội thất' }, options).then(
            (products) => {
                return normalizeData(products);
            },
        );

        let lsProductThietBiVeSinh = await API_Products.readMany(
            { 'categories.level1.name': 'Thiết bị vệ sinh' },
            options,
        ).then((products) => {
            return normalizeData(products);
        });

        let lsProductDenTrangTri = await API_Products.readMany(
            { 'categories.level1.name': 'Đèn trang trí' },
            options,
        ).then((products) => {
            return normalizeData(products);
        });

        let lsProductDoTrangTri = await API_Products.readMany(
            { 'categories.level1.name': 'Đồ trang trí' },
            options,
        ).then((products) => {
            return normalizeData(products);
        });

        let lsPostProject = await API_News.readMany({}, { limit: 4 }).then((posts) => {
            return posts.map((post) => {
                return {
                    title: post.title,
                    slug: post.slug,
                    images: post.images[0],
                };
            });
        });
        //return res.json({data: lsProductDoTrangTri});

        return res.render('pages/home', {
            layout: 'main',
            template: 'home-template',
            meta,
            lsCat,
            doitacs,
            introduce,
            lsSubCat,

            // BE trả về
            lsProductDoNoiThat,
            lsProductThietBiVeSinh,
            lsProductDenTrangTri,
            lsProductDoTrangTri,
            lsPostNews,
            lsPostProject,
            //////////////
        });
    },
    // [GET] /ban-tin
    GET_News: async (req, res, next) => {
        const meta = {
            title: 'Bản tin – H&H Furniture',
            desc: 'Trang chủ H&H Furniture',
            keywords: 'Homepage, đồ nội thất',
        };

        let lsPostNews = await API_News.readMany({}, { limit: 12, select: { content: 0 } });
        return res.render('pages/news', {
            layout: 'main',
            template: 'post-template',
            meta,
            lsSubCat,
            lsCat,

            // BE trả về
            lsPostNews,
            //////////////
        });
    },
    // [GET] /contact
    GET_Contact: async (req, res, next) => {
        const meta = {
            title: 'Liên hệ – H&H Furniture',
            desc: 'Trang chủ H&H Furniture',
            keywords: 'Homepage, đồ nội thất',
        };
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
        const meta = {
            title: 'Khuyến mãi – H&H Furniture',
            desc: 'Trang chủ H&H Furniture',
            keywords: 'Homepage, đồ nội thất',
        };

        return res.render('pages/sales', {
            layout: 'main',
            template: 'khuyen-mai-template',
            lsSubCat,
            lsCat,
            meta,

            // BE trả về
            lsProductDoNoiThat,
            lsProductThietBiVeSinh,
            lsProductDenTrangTri,
            lsProductDoTrangTri,
            lsPostNews,
            //////////
        });
    },
    // [GET] /thanh-toan
    GET_Payment: async (req, res, next) => {
        const meta = {
            title: 'Thanh Toán – H&H Furniture',
            desc: 'Trang chủ H&H Furniture',
            keywords: 'Homepage, đồ nội thất',
        };

        return res.render('pages/checkout', {
            layout: 'main',
            template: 'payment-template',
            meta,
            lsSubCat,
            lsCat,

            // BE trả về
            lsCart,
            lsCartItem,
            //////////
        });
    },

    GET_PolicyPage: async (req, res, next) => {
        const meta = {
            title: policy.title + ' – H&H Furniture',
            desc: 'Trang chủ H&H Furniture',
            keywords: 'Homepage, đồ nội thất',
        };

        return res.render('pages/policy', {
            layout: 'main',
            template: 'policy-template',
            meta,
            lsSubCat,
            lsCat,

            /// BE trả về
            policy,
            ////////////
        });
    },
    // [GET] /gioi-thieu
    GET_Introduction: async (req, res, next) => {
        const meta = {
            title: 'Giới thiệu – H&H Furniture',
            desc: 'Trang chủ H&H Furniture',
            keywords: 'Homepage, đồ nội thất',
        };

        return res.render('pages/introduction', {
            layout: 'main',
            template: 'policy-template',
            meta,
            lsSubCat,
            lsCat,
        });
    },

    // [GET] /search
    GET_SearchProductPage: async (req, res, next) => {
        const meta = {
            title: 'Search',
            desc: 'Trang chủ H&H Furniture',
            keywords: 'Homepage, đồ nội thất',
        };
        const page = parseInt(req.query.page) || 1;

        return res.render('pages/searchProduct', {
            layout: 'main',
            template: 'search-template',
            meta,
            lsSubCat,
            lsCat,
            lsProductSearch,
            pagination: {
                page: page, // The current page the user is on
                pageCount: 12, // The total number of available pages
            },
        });
    },
};

module.exports = Controller_Home;
