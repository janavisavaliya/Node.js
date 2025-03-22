const express = require('express');

const routes = express.Router();

const multer = require('multer');

// File upload configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        let uniq = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${file.fieldname}-${uniq}`);
    }
});
const fileUpload = multer({ storage: storage }).single('productImage');

// Import controllers
const {
    viewProduct,
    insertProduct,
    changeStatus,
    deleteProduct,
    editProduct,
    addProduct,
    updateProduct
} = require('../controller/productController');

// Define routes
routes.get('/', viewProduct);
routes.get('/add', addProduct);
routes.post('/insertproduct', fileUpload, insertProduct);
routes.get('/status', changeStatus);
routes.get('/delete', deleteProduct);
routes.get('/edit', editProduct);
routes.post('/update', fileUpload, updateProduct);

module.exports = routes;
