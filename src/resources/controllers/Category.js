const BASE_URL = process.env.BASE_URL;
const { API_Products } = require('../apis');
const {
    doitacs,
    introduce,
    lsCat,
    lsSubCat,
    lsPostProject,
    lsProductByCategory,
    lsProductDiscount,
    lsProductBestSeller,
} = require('../data/mock');

var category = {
    title: 'Đồ nội thất',
    subCat: [
        { title: 'Combo Tiết Kiệm', href: '/' },

        { title: 'Khuyến Mãi', href: '/' },

        { title: 'Phòng Khách', href: '/' },

        { title: 'Phòng Ăn', href: '/' },

        { title: 'Phòng Ngủ', href: '/' },

        { title: 'Phòng Làm Việc', href: '/' },

        { title: 'Sân Vườn', href: '/' },

        { title: 'Sản Phẩm Khác', href: '/' },
    ],
};
const Controller_Category = {
    // ++++++++++ Client Controller +++++++++++

    // [GET] /danh-muc-san-pham/do-noi-that
    GET_CategoryPage: async (req, res, next) => {
        if (req.params.slug) {
            const meta = { title: category.title, desc: 'Trang chủ H&H Furniture', keywords: 'Homepage, đồ nội thất' };
            const { p } = req.query;
            const options = {
                skip: 12 * (p - 1),
                limit: 12,
            };
            let products = await API_Products.readMany({}, options);
            console.log(products);
            if (!p) {
                // Make the Default value one.
                page = 1;
            }

            return res.render('pages/category', {
                layout: 'main',
                template: 'category-template',
                meta,
                lsSubCat,
                lsCat,
                pagination: {
                    page: 1, // The current page the user is on
                    pageCount: 12, // The total number of available pages
                },
                // BE trả về
                category,
                lsProductByCategory,
                lsProductDiscount,
                lsProductBestSeller,
                lsPostProject,
                ///////////s
            });
        }
    },
};

module.exports = Controller_Category;
