const PORT = process.env.PORT || 9090;
const db = require('./config/database');
const router = require('./resources/routes');

const app = require('./config/server').init();

db.connect();

router(app);

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
