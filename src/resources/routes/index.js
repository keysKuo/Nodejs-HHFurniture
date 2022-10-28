const productRouter = require('./Products');
const homeRouter = require('./Home');
function router(app) {
    app.use('/products', productRouter);
    app.use('/', homeRouter);
}

module.exports = router;
