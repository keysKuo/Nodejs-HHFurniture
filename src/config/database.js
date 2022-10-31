const mongoose = require('mongoose');
require('dotenv').config();

async function connect() {
    try {
        await mongoose.connect(
            `mongodb+srv://HHFurniture:${process.env.DB_PASSWORD}@cluster0.qvzoay3.mongodb.net/?retryWrites=true&w=majority`,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            },
        );
        console.log('Database: HHFurniture\npassword: *******47');
    } catch (error) {
        console.log('Fail to connect db');
    }
}

module.exports = { connect };
