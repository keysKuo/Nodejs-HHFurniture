const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Orders = new Schema({
    order_no: { type: Number, indexed: true },
    product_list: [{ type: mongoose.Types.ObjectId, ref: 'Products'}],
    customer: { type: mongoose.Types.ObjectId, ref: 'Customers'},
    total: { type: Number },
    note: { type: String }
},
{
    timestamps: true
})

module.exports = mongoose.model('Orders', Orders);