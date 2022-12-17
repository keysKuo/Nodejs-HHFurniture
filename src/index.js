const PORT = process.env.PORT || 5000;
const db = require('./config/database');
const router = require('./resources/routes');
require('dotenv').config();
const app = require('./config/server').init();

db.connect();

const { API_Category, API_Products } = require('./resources/apis');
const { Controller_Products } = require('./resources/controllers');

router(app);

app.get('/test', Controller_Products.GET_findProduct);

app.get('/home', async (req, res, next) => {
    // await API_Category.create({
    //     name: 'Bộ sofa',
    //     slug: 'bo-sofa',
    //     parent: mongoose.Types.ObjectId('636b0dbe34587254c1fd3c80')
    // })
    // await API_Category.create({
    //     name: 'Sofa góc',
    //     slug: 'sofa-goc',
    //     parent: mongoose.Types.ObjectId('636b0dbe34587254c1fd3c80')
    // })
    // await API_Category.create({
    //     name: 'Bàn sofa',
    //     slug: 'ban-sofa',
    //     parent: mongoose.Types.ObjectId('636b0dbe34587254c1fd3c80')
    // })
    // await API_Category.create({
    //     name: 'Tủ tivi',
    //     slug: 'tu-tivi',
    //     parent: mongoose.Types.ObjectId('636b0dbe34587254c1fd3c80')
    // })
    res.render('pages/error');
});

app.get('/admin', (req, res, next) => {
    res.render('pages/products/create', {
        layout: 'admin',
    });
});

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
