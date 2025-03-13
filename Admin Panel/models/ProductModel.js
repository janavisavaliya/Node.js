const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    },
    subcategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subcategory'
    },
    exsubcategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'exsubcategory'
    },
    product: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'active'
    }
})

const product = mongoose.model('product', ProductSchema);
module.exports = product;