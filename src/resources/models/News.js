const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const News = new Schema(
    {
        title: { type: String, required: true },
        images: { type: [String], required: true },
        content: { type: String, required: true },
        description: { type: String, required: true },
        slug: { type: String, required: true },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('News', News);
