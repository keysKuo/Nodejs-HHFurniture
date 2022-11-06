const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ImageContent = new Schema({
    url: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('ImageContent', ImageContent)