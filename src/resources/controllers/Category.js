const BASE_URL = process.env.BASE_URL;
const { API_Products, API_Category, API_News } = require('../apis');
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
const { getRelation, queryCategories } = require('../utils/categoryUtils');
const reDistribute = require('../utils/reDistribute');

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
            // Query category
            let category = await API_Category.readOne({ slug: req.params.slug });
            
            const page = parseInt(req.query.page) || 1;
            let query = '';
            switch (category.level) {
                case 1:
                    query = { 'categories.level1.id': category._id };
                    break;
                case 2:
                    query = { 'categories.level2.id': category._id };
                    break;
                case 3:
                    query = { 'categories.level3.id': category._id };
                    break;
                default:
                    break;
            }

            // Query lsProductByCategory
            let lsProductByCategory = await API_Products.readMany(
                { $and: [query, { 'classify.rate': { $gt: -1 } }] },
                { limit: 12, skip: 12 * (page - 1), select: { categories: 0, description: 0 } },
            ).then((products) => {
                return products.map((product) => {
                    return {
                        pname: product.pname,
                        pimg: product.pimg[0],
                        slug: product.slug,
                        price: product.classify[0].price,
                        discount: product.classify[0].discount,
                        rate: Math.max(...product.classify.map((c) => c.rate)),
                    };
                });
            });

            // Query lsProductDiscount
            let lsProductDiscount = await API_Products.readMany(
                { $and: [query, { 'classify.rate': { $gt: 0 } }] },
                { limit: 6, select: { categories: 0, description: 0 } },
            ).then((products) => {
                return products.map((product) => {
                    return {
                        pname: product.pname,
                        pimg: product.pimg[0],
                        slug: product.slug,
                        price: product.classify[0].price,
                        discount: product.classify[0].discount,
                        rate: Math.max(...product.classify.map((c) => c.rate)),
                    };
                });
            });

            // Query lsProductBestSeller
            let lsProductBestSeller = await API_Products.readMany(
                { $and: [query, { 'classify.rate': { $gt: 0 } }] },
                { limit: 6, select: { categories: 0, description: 0 } },
            ).then((products) => {
                return products.map((product) => {
                    return {
                        pname: product.pname,
                        pimg: product.pimg[0],
                        slug: product.slug,
                        price: product.classify[0].price,
                        discount: product.classify[0].discount,
                        rate: Math.max(...product.classify.map((c) => c.rate)),
                    };
                });
            });

            // Query lsPostProject
            let lsPostProject = await API_News.readMany(
                {},
                { limit: 4 }
            ).then((posts) => {
                return posts.map((post) => {
                    return {
                        title: post.title,
                        slug: post.slug,
                        img: post.images[0]
                    };
                });
            });

            const meta = { title: category.name, desc: 'Trang chủ H&H Furniture', keywords: 'Homepage, đồ nội thất' };
            return res.render('pages/category', {
                layout: 'main',
                template: 'category-template',
                meta,
                lsSubCat,
                lsCat,
                pagination: {
                    page: page, // The current page the user is on
                    pageCount: 12, // The total number of available pages
                },
                // BE trả về
                category: category, // done
                lsProductByCategory, // done
                lsProductDiscount, // done
                lsProductBestSeller, // done
                lsPostProject, // done
                ///////////s
            });
        }
    },
};

module.exports = Controller_Category;
