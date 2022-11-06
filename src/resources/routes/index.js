const productRouter = require('./Products');
const homeRouter = require('./Home');
const categoryRouter = require('./Category');
const newsRouter = require('./News');

function router(app) {
    app.use('/', homeRouter);
    app.use('/products', productRouter);
    app.use('/news', newsRouter);
    app.use('/san-pham', productRouter);
    app.use('/danh-muc-san-pham', categoryRouter);
}

module.exports = router;
