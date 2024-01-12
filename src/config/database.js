const mongoose = require('mongoose');
require('dotenv').config();

async function connect() {
    try {
        await mongoose.connect(
            `mongodb+srv://nkeyskuo124:w8x42bbZtE9V1CIe@delirate.sghuaxp.mongodb.net/`,
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
