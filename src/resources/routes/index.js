const productRouter = require('./Products');
const homeRouter = require('./Home');
const categoryRouter = require('./Category');
function router(app) {
    app.use('/', homeRouter);
    app.use('/products', productRouter);
    app.use('/danh-muc-san-pham', categoryRouter);
}

module.exports = router;
