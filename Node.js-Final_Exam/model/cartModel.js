const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',  // Reference to Product model
        required: true
    },
    qty: {
        type: Number,
        required: true
    }
});

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;
