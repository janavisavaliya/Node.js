const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    product: {
        type: String,
        required: true // Check if product name is required
    },
    price: {
        type: String,
        required: true
    },
    qty: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    productImage: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active' // Ensure this is correct
    }
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
