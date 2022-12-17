const productRouter = require('./Products');
const homeRouter = require('./Home');
const categoryRouter = require('./Category');
const newsRouter = require('./News');
const cartRouter = require('./Cart');
const policyRouter = require('./Policy');
const adminRouter = require('./Admin');


const { isAdmin } = require('../middlewares/validators');

function router(app) {
    app.use('/', homeRouter);
    app.use('/admin', isAdmin, adminRouter);

    // app.use('/products', productRouter);
    // app.use('/news', newsRouter);
    // app.use('/ban-tin', newsRouter);
    // app.use('/chinh-sach', policyRouter);
    // app.use('/san-pham', productRouter);
    // app.use('/danh-muc-san-pham', categoryRouter);
    // app.use('/category', categoryRouter);
    app.use('/gio-hang', cartRouter);
}

module.exports = router;
