const CategoryModel = require('../models/CategoryModel');
const SubcategoryModel = require('../models/SubcategoryModel');
const ExSubcategoryModel = require('../models/ExsubcategoryModel');
const productModel = require('../models/ProductModel');


const viewproduct = async (req, res) => {
    try {
        let product = await productModel.find({}).populate('categoryId').populate('subcategoryId').populate('exsubcategoryId');
        return res.render('product/viewproduct', {
            product: product
        })
    } catch (err) {
        console.log(err);
        return false
    }
}


const addProduct = async (req, res) => {
    try {
        let categories = await CategoryModel.find({ status: 'active' })
        let subcategories = await SubcategoryModel.find({ status: 'active' });
        let exsubcategories = await ExSubcategoryModel.find({ status: 'active' })
        return res.render('product/addproduct', {
            category: categories,
            subcategory: subcategories,
            exsubcategory: exsubcategories
        })
    } catch (err) {
        console.log(err);
        return false
    }
}

const ajaxproduct = async (req, res) => {
    let categoryid = req.query.categoryid;
    console.log(categoryid);
    try {
        let category = await SubcategoryModel.find({ categoryId: categoryid }).populate('categoryId');
        console.log(category);
        let subcategory = await ExSubcategoryModel.find({ categoryId: categoryid }).populate('categoryId').populate('subcategoryId');
        console.log(subcategory);
        let productcategory = await productModel.find({ categoryId: categoryid }).populate('categoryId').populate('productId');
        return res.status(200).send({
            success: true,
            message: "record successfully fetch",
            category: category,
            subcategory: subcategory,
            exsubcategory: exsubcategory,
            productcategory: productcategory
        })
    } catch (err) {
        console.log(err);
        return false;
    }
}



const insertProduct = async (req, res) => {
    try {
        const { editid, category, subcategory, exsubcategory, product } = req.body;
        if (editid) {
            await productModel.findByIdAndUpdate(editid, {
                categoryId: category,
                subcategoryId: subcategory,
                exsubcategory: exsubcategory,
                product: product
            })
            req.flash('success', 'Exsubcategory successfully update');
            return res.redirect('/product')
        } else {
            await productModel.create({
                categoryId: category,
                subcategoryId: subcategory,
                exsubcategory: exsubcategory,
                product: product
            })
            req.flash('success', 'Exsubcategory successfully create');
            return res.redirect('/product/addproduct')
        }
    } catch (err) {
        console.log(err);
        return false;
    }
}


const changeStatus = async (req, res) => {
    try {
        const { id, status } = req.query;
        if (status == "deactive") {
            await productModel.findByIdAndUpdate(id, {
                status: status
            })
            req.flash('success', "Subcategory update")
            return res.redirect('/product')
        } else {
            await productModel.findByIdAndUpdate(id, {
                status: status
            })
            req.flash("success", "Subcategory Update")
            return res.redirect('/product')
        }
    } catch (err) {
        console.log(err);
        return false
    }
}

const deleteProduct = async (req, res) => {
    try {
        let id = req.query?.id;
        await productModel.findByIdAndDelete(id);
        req.flash('success', 'subcategory successfully delete')
        return res.redirect('/product');

    } catch (err) {
        console.log(err);
        return false;

    }
}


const editProduct = async (req, res) => {
    try {
        let id = req.query?.id
        let category = await CategoryModel.find({ status: 'active' })
        let subcategory = await SubcategoryModel.find({ status: 'active' })
        let exsubcategory = await productModel.find({ status: 'active' })
        let single = await productModel.findById(id).populate('categoryId').populate('subcategoryId').populate('exsubcategoryId');
        return res.render('product/editproduct', {
            category: category,
            subcategory: subcategory,
            exsubcategory: exsubcategory,
            single
        })
    } catch (err) {
        console.log(err);
        return false;
    }
}

module.exports = {
    viewproduct,
    addProduct,
    ajaxproduct,
    insertProduct,
    changeStatus,
    deleteProduct,
    editProduct
}