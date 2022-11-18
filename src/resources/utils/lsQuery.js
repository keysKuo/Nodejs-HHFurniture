const { normalizeData } = require('../utils/categoryUtils');
const { API_Products, API_News } = require('../apis')
const lsQuery = async (options) => {
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

    let lsPostNews = await API_News.readMany({}, { limit: 4 }).then((posts) => {
        return posts.map((post) => {
            return {
                title: post.title,
                slug: post.slug,
                images: post.images[0],
            };
        });
    });

    return {
        lsProductDoNoiThat, 
        lsProductThietBiVeSinh, 
        lsProductDoTrangTri, 
        lsProductDenTrangTri,
        lsPostNews
    }
}

module.exports = lsQuery;