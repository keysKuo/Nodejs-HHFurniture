const BASE_URL = process.env.BASE_URL;
const { doitacs, introduce, lsCat, lsSubCat, lsPost, posts, lsProduct } = require('../data/mock');
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
    GET_CategoryPage: async (req, res, next) => {
        if (req.params.slug) {
            const meta = { title: category.title, desc: 'Trang chủ H&H Furniture', keywords: 'Homepage, đồ nội thất' };
            return res.render('pages/category', {
                layout: 'main',
                template: 'category-template',
                meta,
                category,
                lsSubCat,
                lsCat,
                lsProduct,
                posts,
            });
        }
    },
};

module.exports = Controller_Category;
