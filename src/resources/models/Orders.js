const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Orders = new Schema({
    order_no: { type: Number },
    product_list: [Object],
    customer: { type: mongoose.Types.ObjectId, ref: 'Customers'},
    total: { type: String },
    note: { type: String }
},
{
    timestamps: true
})

module.exports = mongoose.model('Orders', Orders);