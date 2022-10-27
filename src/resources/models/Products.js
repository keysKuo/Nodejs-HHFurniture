const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Products = new Schema(
    {
        pid: { type: String, required: true, unique: true },
        pname: { type: String, required: true },
        pimg: { type: [String] },
        material: { type: String },
        sizes: { type: [String] },
        colors: { type: [String] },
        prices: { type: [Number] },
        discounts: { type: [Number] },
        quantity: { type: [Number] },
        description: { type: String },
        categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
        slug: { type: String, required: true },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Products', Products);
