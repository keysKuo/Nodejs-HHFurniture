const PORT = process.env.PORT || 5000;
const db = require('./config/database');
const router = require('./resources/routes');
require('dotenv').config();
const app = require('./config/server').init();

db.connect();

router(app);


app.get('/home', async (req, res, next) => {
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
