const express = require('express');
const router = express.Router();
const productRouter = require('./Products');
const newsRouter = require('./News');
const categoryRouter = require('./Category');
// const orderRouter = require('./Order');
// const userRouter = require('./User');

// Home
router.get('/', (req, res) => {
    return res.render('pages/admin', {
        layout: 'admin'
    });
})

// Products
router.use('/products', productRouter);

// Categories
router.use('/category', categoryRouter);

// News
router.use('/news', newsRouter);


router.get('/user/logout', (req, res, next) => {
    req.session.destroy();
    return res.redirect('/dang-nhap');
})
module.exports = router;