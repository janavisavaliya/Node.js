const CartModel = require("../model/cartModel");
const ProductModel = require("../model/ProductModel");

const viewcartPage = async (req, res) => {
    try {
        // Fetch cart items and populate product details
        const cartItems = await CartModel.find()
            .populate({
                path: 'productId',
                select: 'product price qty description productImage status'
            })
            .exec();

        // Calculate total bill
        let totalBill = 0;
        cartItems.forEach(item => {
            if (item.productId) {
                totalBill += item.productId.price * item.qty;
            }
        });

        res.render('cart/viewcart', { cartItems, totalBill });
    } catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).send('Internal Server Error');
    }
};

const addToCart = async (req, res) => {
    const { productId, qty } = req.body;

    try {
        const product = await ProductModel.findById(productId);
        if (!product) {
            return res.redirect("/product");
        }

        let cartItem = await CartModel.findOne({ productId });

        if (cartItem) {
            cartItem.qty += parseInt(qty);
        } else {
            cartItem = new CartModel({ productId, qty });
        }

        await cartItem.save();
        res.redirect("/product");
    } catch (error) {
        console.error("Error adding to cart:", error);
        res.redirect("/product");
    }
};

const updateCart = async (req, res) => {
    const { cartId, qty } = req.body;

    try {
        const cartItem = await CartModel.findById(cartId);
        if (!cartItem) {
            return res.status(404).send("Cart item not found");
        }

        cartItem.qty = parseInt(qty);
        await cartItem.save();

        res.redirect("/cart");
    } catch (error) {
        console.error("Error updating cart:", error);
        res.status(500).send("Error updating cart");
    }
};

// Remove Item from Cart
const removeFromCart = async (req, res) => {
    try {
        await CartModel.findByIdAndDelete(req.body.cartId);
        res.redirect("/cart");
    } catch (error) {
        console.error("Error removing item from cart:", error);
        res.status(500).send("Error removing item from cart");
    }
};

module.exports = { viewcartPage, addToCart, updateCart, removeFromCart };
