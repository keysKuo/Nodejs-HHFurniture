const express = require('express');
const router = express.Router();
const { doitacs, introduce } = require('../data/mock');

var lsSubCat = [
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
        items: [
            {
                title: 'Giới thiệu',
                href: 'gioi-thieu',
            },
            {
                title: 'Liên hệ',
                href: 'contact',
            },
        ],
        isExpanded: true,
    },
    {
        title: 'Sản phẩm',
        items: [
            {
                title: 'Đồ nội thất',
                href: 'danh-muc-san-pham',
            },
            {
                title: 'Thiết bị vệ sinh',
                href: 'danh-muc-san-pham',
            },
            {
                title: 'Đèn trang trí',
                href: 'danh-muc-san-pham',
            },
            {
                title: 'Đồ trang trí',
                href: 'danh-muc-san-pham',
            },
        ],
        isExpanded: true,
    },
    {
        title: 'Bản tin H & H',
        href: 'ban-tin',
    },
    {
        title: 'Chính sách',
        items: [
            { href: '', title: 'CHÍNH SÁCH ĐẠI LÝ' },
            { href: '', title: 'CHÍNH SÁCH CỘNG TÁC VIÊN' },
            { href: '', title: 'CHÍNH SÁCH GIAO HÀNG' },
            { href: '', title: 'CHÍNH SÁCH ĐỔI TRẢ – BẢO HÀNH' },
            { href: '', title: ' QUY TRÌNH BÁN HÀNG' },
        ],
        isExpanded: true,
    },
    {
        title: 'Khuyến mãi',
        href: 'khuyen-mai',
        isExpanded: false,
        isHot: true,
    },
];
var lsProduct = [
    {
        title: 'Bàn Ăn Thông Minh Mahal Kita Home LTX-801M.13.CTD',
        img: 'HH-FURNITURE_N.LTX-801M.13.CTD_1900866816-300x300.jpg',
        price: 200000000,
        href: '/',
    },
    {
        title: 'Bàn Ăn Thông Minh Mahal Kita Home LTX-801M.13.CTD',
        img: 'HH-FURNITURE_N.RIH-B19.CTV_1900866816-300x300.jpg',
        price: 200000000,
        href: '/',
    },
    {
        title: 'Bàn Ăn Thông Minh Mahal Kita Home LTX-801M.13.CTD',
        img: 'HH-FURNITURE_N.LTX-801M.13.CTD_1900866816-300x300.jpg',
        price: 200000000,
        href: '/',
    },
    {
        title: 'Bàn Ăn Thông Minh Mahal Kita Home LTX-801M.13.CTD',
        img: 'HH-FURNITURE_N.RIH-B19.CTV_1900866816-300x300.jpg',
        price: 200000000,
        href: '/',
    },
    {
        title: 'Bàn Ăn Thông Minh Mahal Kita Home LTX-801M.13.CTD',
        img: 'HH-FURNITURE_N.LTX-801M.13.CTD_1900866816-300x300.jpg',
        price: 200000000,
        href: '/',
    },
    {
        title: 'Bàn Ăn Thông Minh Mahal Kita Home LTX-801M.13.CTD',
        img: 'HH-FURNITURE_N.LTX-801M.13.CTD_1900866816-300x300.jpg',
        price: 200000000,
        href: '/',
    },
    {
        title: 'Bàn Ăn Thông Minh Mahal Kita Home LTX-801M.13.CTD',
        img: 'HH-FURNITURE_N.LTX-801M.13.CTD_1900866816-300x300.jpg',
        price: 200000000,
        href: '/',
    },
    {
        title: 'Bàn Ăn Thông Minh Mahal Kita Home LTX-801M.13.CTD',
        img: 'HH-FURNITURE_N.LTX-801M.13.CTD_1900866816-300x300.jpg',
        price: 200000000,
        href: '/',
    },
    {
        title: 'Bàn Ăn Thông Minh Mahal Kita Home LTX-801M.13.CTD',
        img: 'HH-FURNITURE_N.LTX-801M.13.CTD_1900866816-300x300.jpg',
        price: 200000000,
        href: '/',
    },
];
var posts = [
    {
        title: 'TOCEI Chia Sẻ Kinh Nghiệm Khi Mua Thiết Bị Vệ Sinh',
        href: '',
        img: 'images/2-1024x512.png',
    },
    {
        title: 'Sale off từ 40 -50% nhân dịp Hội chợ TRIỂN LÃM QUỐC TẾ 𝐕𝐈𝐄𝐓𝐁𝐔𝐈𝐋𝐃 𝟐𝟎𝟐𝟐 – LẦN 3',
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
var lsPost = [
    {
        title: 'TOCEI Chia Sẻ Kinh Nghiệm Khi Mua Thiết Bị Vệ Sinh',
        href: '',
        desc: 'Bạn thân mến, nếu bạn đang cần mua thiết bị vệ sinh thì bài viết này đặc biệt cần thiết dành cho Bạn. Có thể Bạn',
        date: '23 Tháng Tám, 2022',
        img: 'images/2-1024x512.png',
    },
    {
        title: 'TOCEI Chia Sẻ Kinh Nghiệm Khi Mua Thiết Bị Vệ Sinh',
        href: '',
        desc: 'Bạn thân mến, nếu bạn đang cần mua thiết bị vệ sinh thì bài viết này đặc biệt cần thiết dành cho Bạn. Có thể Bạn',
        date: '23 Tháng Tám, 2022',
        img: 'images/2-1024x512.png',
    },
    {
        title: 'TOCEI Chia Sẻ Kinh Nghiệm Khi Mua Thiết Bị Vệ Sinh',
        href: '',
        desc: 'Bạn thân mến, nếu bạn đang cần mua thiết bị vệ sinh thì bài viết này đặc biệt cần thiết dành cho Bạn. Có thể Bạn',
        date: '23 Tháng Tám, 2022',
        img: 'images/2-1024x512.png',
    },
    {
        title: 'TOCEI Chia Sẻ Kinh Nghiệm Khi Mua Thiết Bị Vệ Sinh',
        href: '',
        desc: 'Bạn thân mến, nếu bạn đang cần mua thiết bị vệ sinh thì bài viết này đặc biệt cần thiết dành cho Bạn. Có thể Bạn',
        date: '23 Tháng Tám, 2022',
        img: 'images/2-1024x512.png',
    },
    {
        title: 'TOCEI Chia Sẻ Kinh Nghiệm Khi Mua Thiết Bị Vệ Sinh',
        href: '',
        desc: 'Bạn thân mến, nếu bạn đang cần mua thiết bị vệ sinh thì bài viết này đặc biệt cần thiết dành cho Bạn. Có thể Bạn',
        date: '23 Tháng Tám, 2022',
        img: 'images/2-1024x512.png',
    },
    {
        title: 'TOCEI Chia Sẻ Kinh Nghiệm Khi Mua Thiết Bị Vệ Sinh',
        href: '',
        desc: 'Bạn thân mến, nếu bạn đang cần mua thiết bị vệ sinh thì bài viết này đặc biệt cần thiết dành cho Bạn. Có thể Bạn',
        date: '23 Tháng Tám, 2022',
        img: 'images/2-1024x512.png',
    },
    {
        title: 'Sale off từ 40 -50% nhân dịp Hội chợ TRIỂN LÃM QUỐC TẾ 𝐕𝐈𝐄𝐓𝐁𝐔𝐈𝐋𝐃 𝟐𝟎𝟐𝟐 – LẦN 3',
        href: '',
        desc: 'Bạn thân mến, nếu bạn đang cần mua thiết bị vệ sinh thì bài viết này đặc biệt cần thiết dành cho Bạn. Có thể Bạn',
        date: '23 Tháng Tám, 2022',
        img: 'images/2-1024x512.png',
    },
    {
        title: 'TOCEI Chia Sẻ Kinh Nghiệm Khi Mua Thiết Bị Vệ Sinh',
        href: '',
        desc: 'Bạn thân mến, nếu bạn đang cần mua thiết bị vệ sinh thì bài viết này đặc biệt cần thiết dành cho Bạn. Có thể Bạn',
        date: '23 Tháng Tám, 2022',
        img: 'images/2-1024x512.png',
    },
    {
        title: 'TOCEI Chia Sẻ Kinh Nghiệm Khi Mua Thiết Bị Vệ Sinh',
        href: '',
        desc: 'Bạn thân mến, nếu bạn đang cần mua thiết bị vệ sinh thì bài viết này đặc biệt cần thiết dành cho Bạn. Có thể Bạn',
        date: '23 Tháng Tám, 2022',
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
        lsSubCat,
        lsCat,
        lsProduct,
        doitacs,
        posts,
        introduce,
    });
});
router.get('/contact', (req, res, next) => {
    res.render('pages/contact/contact', {
        layout: 'main',
        template: 'contact-template',
        lsSubCat,
        lsCat,
    });
});

router.get('/ban-tin', (req, res, next) => {
    res.render('pages/post/post', {
        layout: 'main',
        template: 'post-template',
        lsSubCat,
        lsCat,
        lsPost,
    });
});

router.get('/khuyen-mai', (req, res, next) => {
    res.render('pages/sales/sales', {
        layout: 'main',
        template: 'khuyen-mai-template',
        lsSubCat,
        lsCat,
        lsProduct,
        posts,
    });
});

router.get('/danh-muc-san-pham', (req, res, next) => {
    res.render('pages/category/category', {
        layout: 'main',
        template: 'category-template',
        lsSubCat,
        lsCat,
        lsProduct,
        posts,
    });
});
module.exports = router;
