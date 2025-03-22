const ProductModel = require('../model/ProductModel');
const fs = require('fs');

const viewProduct = async (req, res) => {
    try {
        let product = await ProductModel.find({});
        return res.render('product/viewproduct', { product });
    } catch (err) {
        console.log("Error in viewProduct:", err);
        return false;
    }
};

const addProduct = async (req, res) => {
    try {
        return res.render('product/addproduct');
    } catch (err) {
        console.log("Error in addProduct:", err);
        return false;
    }
};

const insertProduct = async (req, res) => {
    try {
        const { product, price, qty, description } = req.body;

        await ProductModel.create({
            product,
            price,
            qty,
            description,
            productImage: req.file?.path
        });

        return res.redirect('/product');
    } catch (err) {
        console.log("Error inserting product:", err);
        return res.redirect('/product/add');
    }
};

const changeStatus = async (req, res) => {
    try {
        const { id, status } = req.query;
        await ProductModel.findByIdAndUpdate(id, { status });
        return res.redirect('/product');
    } catch (err) {
        console.log("Error changing product status:", err);
        return false;
    }
};

const deleteProduct = async (req, res) => {
    try {
        let id = req.query?.id;

        if (!id) {
            return res.redirect('/product');
        }

        let product = await ProductModel.findById(id);

        if (!product) {
            return res.redirect('/product');
        }

        if (product.productImage) {
            fs.unlink(product.productImage, (err) => {
                if (err) console.log("Error deleting image:", err);
            });
        }

        // Delete product from database
        await ProductModel.findByIdAndDelete(id);

        return res.redirect('/product');
    } catch (err) {
        console.log("Error deleting product:", err);
        req.flash('error', 'Error deleting product');
        return res.redirect('/product');
    }
};


const editProduct = async (req, res) => {
    try {
        let id = req.query?.id;
        let single = await ProductModel.findById(id);
        return res.render('product/editproduct', { single });
    } catch (err) {
        console.log(err);
        return false;
    }
};

const updateProduct = async (req, res) => {
    try {
        const { editid, product, price, qty, description } = req.body;

        if (!editid) {
            return res.redirect('/product');
        }

        let productData = await ProductModel.findById(editid);

        if (!req.file) {
            await ProductModel.findByIdAndUpdate(editid, {
                product,
                price,
                qty,
                description
            });
        } else {
            fs.unlinkSync(productData?.productImage);
            await ProductModel.findByIdAndUpdate(editid, {
                product,
                price,
                qty,
                description,
                productImage: req.file?.path || productData.productImage
            });
        }

        req.flash('success', 'Product successfully updated');
        return res.redirect('/product');
    } catch (err) {
        console.log("Error updating product:", err);
        return res.redirect('/product');
    }
};

module.exports = {
    viewProduct,
    addProduct,
    insertProduct,
    changeStatus,
    deleteProduct,
    editProduct,
    updateProduct
};
