const productRouter = require('./Products');
const homeRouter = require('./Home');
const categoryRouter = require('./Category');
const newsRouter = require('./News');
const cartRouter = require('./Cart');
const policyRouter = require('./Policy');

function router(app) {
    app.use('/', homeRouter);
    app.use('/products', productRouter);
    app.use('/news', newsRouter);
    app.use('/ban-tin', newsRouter);
    app.use('/chinh-sach', policyRouter);
    app.use('/san-pham', productRouter);
    app.use('/danh-muc-san-pham', categoryRouter);
    app.use('/category', categoryRouter);
    app.use('/gio-hang', cartRouter);
}

module.exports = router;
