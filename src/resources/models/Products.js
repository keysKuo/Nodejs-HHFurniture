const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Products = new Schema(
    {
        pid: { type: [String], required: true, unique: true },
        pname: { type: String, required: true },
        pimg: { type: [String] },
        material: { type: String },
        feature: { type: [String] },
        classify: [
            {
                size: String,
                price: Number,
                discount: Number,
                rate: Number,
                pid: [String],
                colors: [String],
                quantity: [Number],
            },
        ],
        description: { type: String },
        categories: [
            {
                level1: { type: { name: String, id: String } },
                level2: { type: { name: String, id: String } },
                level3: { type: { name: String, id: String } },
            },
        ],
        slug: { type: String, required: true },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Products', Products);
