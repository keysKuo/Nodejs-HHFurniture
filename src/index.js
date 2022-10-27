const PORT = process.env.PORT || 8080;
const db = require('./config/database');

const app = require('./config/server').init();

db.connect();

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
