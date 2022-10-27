const PORT = process.env.PORT || 8080;
const app = require('./config/server').init();

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
