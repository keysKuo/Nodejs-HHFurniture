const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Policy = new Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    content_images: {type: [String]},
    slug: {type: String, unique: true}
})

module.exports = mongoose.model('Policy', Policy);