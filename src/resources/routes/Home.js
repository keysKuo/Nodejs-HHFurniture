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

var lsProduct = [
    {
        title: 'Bàn Ăn Thông Minh Mahal Kita Home LTX-801M.13.CTD',
        img: 'HH-FURNITURE_N.LTX-801M.13.CTD_1900866816-300x300.jpg',
        href: '/',
    },
    {
        title: 'Bàn Ăn Thông Minh Mahal Kita Home LTX-801M.13.CTD',
        img: 'HH-FURNITURE_N.RIH-B19.CTV_1900866816-300x300.jpg',
        href: '/',
    },
    {
        title: 'Bàn Ăn Thông Minh Mahal Kita Home LTX-801M.13.CTD',
        img: 'HH-FURNITURE_N.LTX-801M.13.CTD_1900866816-300x300.jpg',
        href: '/',
    },
    {
        title: 'Bàn Ăn Thông Minh Mahal Kita Home LTX-801M.13.CTD',
        img: 'HH-FURNITURE_N.RIH-B19.CTV_1900866816-300x300.jpg',
        href: '/',
    },
    {
        title: 'Bàn Ăn Thông Minh Mahal Kita Home LTX-801M.13.CTD',
        img: 'HH-FURNITURE_N.LTX-801M.13.CTD_1900866816-300x300.jpg',
        href: '/',
    },
    {
        title: 'Bàn Ăn Thông Minh Mahal Kita Home LTX-801M.13.CTD',
        img: 'HH-FURNITURE_N.LTX-801M.13.CTD_1900866816-300x300.jpg',
        href: '/',
    },
    {
        title: 'Bàn Ăn Thông Minh Mahal Kita Home LTX-801M.13.CTD',
        img: 'HH-FURNITURE_N.LTX-801M.13.CTD_1900866816-300x300.jpg',
        href: '/',
    },
    {
        title: 'Bàn Ăn Thông Minh Mahal Kita Home LTX-801M.13.CTD',
        img: 'HH-FURNITURE_N.LTX-801M.13.CTD_1900866816-300x300.jpg',
        href: '/',
    },
    {
        title: 'Bàn Ăn Thông Minh Mahal Kita Home LTX-801M.13.CTD',
        img: 'HH-FURNITURE_N.LTX-801M.13.CTD_1900866816-300x300.jpg',
        href: '/',
    },
];

var doitacs = [
    { alt: '', src: 'images/7a57bfce40ae81f0d8bf-300x300.jpg' },
    { alt: '', src: 'images/31544eccb1ac70f229bd-300x300.jpg' },
    { alt: '', src: 'images/ad4e55d6aab66be832a7-300x300.jpg' },
    { alt: '', src: 'images/236583f37c93bdcde482-286x300.jpg' },
    { alt: '', src: 'images/354728d2d7b216ec4fa3-300x300.jpg' },
    { alt: '', src: 'images/95acff380058c1069849-300x300.jpg' },
    { alt: '', src: 'images/a2ab573fa85f6901304e-300x300.jpg' },
    { alt: '', src: 'images/c377a2e05d809cdec591-300x300.jpg' },
    { alt: '', src: 'images/86711debe28b23d57a9a.jpg' },
    { alt: '', src: 'images/40b42a2dd54d14134d5c-300x300.jpg' },
];
var posts = [
    {
        title: 'TOCEI Chia Sẻ Kinh Nghiệm Khi Mua Thiết Bị Vệ Sinh',
        href: '',
        img: 'images/2-1024x512.png',
    },
    {
        title: 'TOCEI Chia Sẻ Kinh Nghiệm Khi Mua Thiết Bị Vệ Sinh',
        href: '',
        img: 'images/2-1024x512.png',
    },
    {
        title: 'TOCEI Chia Sẻ Kinh Nghiệm Khi Mua Thiết Bị Vệ Sinh',
        href: '',
        img: 'images/2-1024x512.png',
    },
    {
        title: 'TOCEI Chia Sẻ Kinh Nghiệm Khi Mua Thiết Bị Vệ Sinh',
        href: '',
        img: 'images/2-1024x512.png',
    },
    {
        title: 'TOCEI Chia Sẻ Kinh Nghiệm Khi Mua Thiết Bị Vệ Sinh',
        href: '',
        img: 'images/2-1024x512.png',
    },
];
router.get('/', (req, res, next) => {
    res.render('pages/home/home', {
        layout: 'main',
        template: 'home-template',
        lsSubCat: data,
        lsCat,
        lsProduct,
        doitacs,
        posts,
    });
});

module.exports = router;
