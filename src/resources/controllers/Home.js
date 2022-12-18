const BASE_URL = process.env.BASE_URL;
const { API_Products, API_News, API_Category } = require('../apis');
const {
    doitacs,
    introduce,
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
const lsQuery = require('../utils/lsQuery');
let lsCat = [
    {
        title: 'Về H & H',
        items: [
            {
                title: 'Giới thiệu',
                slug: '/gioi-thieu',
            },
            {
                title: 'Liên hệ',
                slug: '/contact',
            },
        ],
        isExpanded: true,
    },
    {
        title: 'Sản phẩm',
        items: [
            {
                title: 'Đồ nội thất',
                slug: '/danh-muc-san-pham/do-noi-that',
            },
            {
                title: 'Thiết bị vệ sinh',
                slug: '/danh-muc-san-pham',
            },
            {
                title: 'Đèn trang trí',
                slug: '/danh-muc-san-pham',
            },
            {
                title: 'Đồ trang trí',
                slug: '/danh-muc-san-pham',
            },
        ],
        isExpanded: true,
    },
    {
        title: 'Bản tin H & H',
        slug: '/ban-tin',
    },
    {
        title: 'Chính sách',
        items: [
            { slug: '/chinh-sach/chinh-sach-dai-ly', title: 'CHÍNH SÁCH ĐẠI LÝ' },
            { slug: '/chinh-sach/chinh-sach-dai-ly', title: 'CHÍNH SÁCH CỘNG TÁC VIÊN' },
            { slug: '/chinh-sach/chinh-sach-dai-ly', title: 'CHÍNH SÁCH GIAO HÀNG' },
            { slug: '/chinh-sach/chinh-sach-dai-ly', title: 'CHÍNH SÁCH ĐỔI TRẢ – BẢO HÀNH' },
            { slug: '/chinh-sach/chinh-sach-dai-ly', title: ' QUY TRÌNH BÁN HÀNG' },
        ],
        isExpanded: true,
    },
    {
        title: 'Khuyến mãi',
        slug: '/khuyen-mai',
        isExpanded: false,
        isHot: true,
    },
];
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

        let data = await lsQuery(options);
        // let level1 = await API_Category.readMany({ level: 1 });
        // let level2 = await API_Category.readMany({ level: 2 });
        // let level3 = await API_Category.readMany({ level: 3 });
        // let makeTree = (cat, parent) => {
        //     let node = {
        //         title: parent.name,
        //         slug: '/danh-muc-san-pham/' + parent.slug,
        //         items: [],
        //     };
        //     cat.filter((n) => n.parent?.slug === parent?.slug).forEach((n) => {
        //         return node.items.push({ title: n.name, slug: '/danh-muc-san-pham/' + n.slug, items: [] });
        //     });
        //     return node;
        // };
        // level1.forEach((n) => {
        //     let result = makeTree(level2, n);
        //     lsCat.map((n) => {
        //         if (n.title == 'Sản phẩm') {
        //             n.items.push(result);
        //         }
        //     });
        // });

        // return res.json({data: data});

        return res.render('pages/home', {
            layout: 'main',
            template: 'home-template',
            meta,
            lsCat,
            doitacs,
            introduce,
            lsSubCat,

            // BE trả về
            lsProductDoNoiThat: data.lsProductDoNoiThat,
            lsProductThietBiVeSinh: data.lsProductThietBiVeSinh,
            lsProductDenTrangTri: data.lsProductDenTrangTri,
            lsProductDoTrangTri: data.lsProductDoTrangTri,
            lsPostNews: data.lsPostNews,
            lsPostProject,
            //////////////
        });
    },
    // [GET] /ban-tin
    GET_News: async (req, res, next) => {},
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

        const options = {
            limit: 12,
            select: {
                description: 0,
                categories: 0,
            },
        };

        let data = await lsQuery(options);

        return res.render('pages/sales', {
            layout: 'main',
            template: 'khuyen-mai-template',
            lsSubCat,
            lsCat,
            meta,

            // BE trả về
            lsProductDoNoiThat: data.lsProductDoNoiThat,
            lsProductThietBiVeSinh: data.lsProductThietBiVeSinh,
            lsProductDenTrangTri: data.lsProductDenTrangTri,
            lsProductDoTrangTri: data.lsProductDoTrangTri,
            lsPostNews: data.lsPostNews,
            //////////
        });
    },
    // [GET] /thanh-toan
    GET_Payment: async (req, res, next) => {
        const product_list = req.session.product_list;
        const counter = req.session.counter;
        let n = counter ? counter.length : 0;
        const options = {
            select: { description: 0 },
        };

        let lsCartItem = [];
        let index;
        for (let i = 0; i < n; i++) {
            await API_Products.readOne({ pid: { $in: product_list[i] } }, options).then((p) => {
                index = p.pid.findIndex((ip) => ip == product_list[i]);
                let curr = p.classify[index];
                let product = {
                    productId: p.pid[index],
                    size: curr.size,
                    price: curr.price,
                    material: p.material,
                    color: curr.colors[0],
                    img: p.pimg[0],
                    slug: p.slug,
                };

                lsCartItem.push({
                    product: product,
                    rate: curr.rate,
                    quantity: counter[i],
                    discount: curr.discount,
                    total: curr.discount ? curr.discount * counter[i] : curr.price * counter[i],
                });
            });
        }

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
            lsCartItem, //done
            //////////
        });
    },

    // [GET] /policy/:slug
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
