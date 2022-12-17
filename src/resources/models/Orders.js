const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Orders = new Schema({
    order_no: { type: String, unique: true },
    product_list: [Object],
    customer: { type: mongoose.Types.ObjectId, ref: 'Customers'},
    total: { type: String },
    status: {type: String, default: 'Đang chờ duyệt'},
    note: { type: String }
},
{
    timestamps: true
})

module.exports = mongoose.model('Orders', Orders);