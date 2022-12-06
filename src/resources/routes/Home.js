const express = require('express');
const {
    Controller_Cart,
    Controller_Home,
    Controller_Category,
    Controller_Products,
    Controller_News,
} = require('../controllers');
const router = express.Router();

router.get('/', Controller_Home.GET_Homepage);

router.get('/s', Controller_Home.GET_SearchProductPage);

router.get('/contact', Controller_Home.GET_Contact);

router.get('/ban-tin', Controller_Home.GET_News);

router.get('/ban-tin/:slug', Controller_News.GET_newsDetail);

router.get('/khuyen-mai', Controller_Home.GET_Sales);

router.get('/thanh-toan', Controller_Home.GET_Payment);

router.get('/gioi-thieu', Controller_Home.GET_Introduction);

router.get('/danh-muc-san-pham/:slug', Controller_Category.GET_CategoryPage);

router.get('/san-pham/tim-kiem', Controller_Products.GET_findProduct);

router.get('/san-pham/:slug', Controller_Products.GET_productDetail);

router.post('/addCart', (req, res, next) => {
    const { pid, quantity } = req.body;
    let isIncluded = -1;
    if(req.session.product_list) {
        isIncluded = req.session.product_list.findIndex(p => p == pid);
        console.log(isIncluded);
        if(isIncluded == -1) {
            req.session.product_list.push(pid);
        }
            
    }else {
        req.session.product_list = [pid]
    }
    
    if(req.session.counter) {
        if(isIncluded > -1) {
            req.session.counter[isIncluded] += parseInt(quantity)
        }
        else {
            req.session.counter.push(parseInt(quantity));
        }
    }else {
        req.session.counter = [parseInt(quantity)];
    }

    return res.send({msg: `Sản phẩm ${pid} đã được thêm vào giỏ hàng`});
})  

router.get('/gio-hang', Controller_Cart.GET_CartPage);

router.get('/dang-nhap', (req, res, next) => {
    return res.render('pages/common/login', {
        error: req.flash('error') || '',
    });
});

router.post('/dang-nhap', (req, res, next) => {
    const { username, password } = req.body;
    if (username == 'admin' && password == '123456') {
        req.session.isLogin = true;
        return res.redirect('/admin');
    } else {
        req.flash('error', 'Sai tài khoản hoặc mật khẩu');
        return res.redirect('/dang-nhap');
    }
});

// router.get('*', function (req, res) {
//     res.status(404).render('error', {
//         layout: 'main',
//         template: 'error-template',
//     });
// });
module.exports = router;
