const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Products = new Schema(
    {
        pid: { type: String, required: true, unique: true },
        pname: { type: String, required: true },
        material: { type: String },
        sizes: { type: [String] },
        colors: { type: [String] },
        prices: { type: [Number] },
        discounts: { type: [Number] },
        description: { type: String },
        quantity: { type: Number },
        categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
        slug: { type: String, required: true },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Products', Products);
