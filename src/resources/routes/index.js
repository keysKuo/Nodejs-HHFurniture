const productRouter = require('./Products');

function router(app) {
    app.use('/products', productRouter);
}

module.exports = router;