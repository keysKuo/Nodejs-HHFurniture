const express = require('express');
const router = express.Router();

var data = [
    {
        name: 'Đồ nội thất',
        img: 'images/category-chair-logo.png',
        alt: 'Đồ nội thất',
        href: '/',
    },
    {
        name: 'THIẾT BỊ VỆ SINH​',
        img: 'images/bathroom-icon.png',
        alt: 'thiết bị vệ sinh',
        href: '/',
    },
    {
        name: 'ĐÈN TRANG TRÍ​​',
        img: 'images/den-chum-icon-chandelier.png',
        alt: 'Đèn trang trí',
        href: '/',
    },
    {
        name: 'ĐỒ TRANG TRÍ​',
        img: 'images/do-trang-tri-icon.png',
        alt: 'Đồ trang trí',
        href: '/',
    },
];

var lsCat = [
    {
        title: 'Về H & H',
        isExpanded: true,
    },
    {
        title: 'Sản phẩm',
        isExpanded: true,
    },
    {
        title: 'Bản tin H & H',
        isExpanded: true,
    },
    {
        title: 'Chính sách',
        isExpanded: true,
    },
    {
        title: 'Khuyến mãi',
        isExpanded: false,
        isHot: true,
    },
];

router.get('/', (req, res, next) => {
    res.render('pages/home/home', { layout: 'main', template: 'home-template', lsSubCat: data, lsCat });
});

module.exports = router;
