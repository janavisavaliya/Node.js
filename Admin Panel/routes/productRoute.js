const express = require('express');

const routes = express.Router();

const { viewproduct, insertProduct, ajaxproduct, changeStatus, deleteProduct, editProduct, addProduct } = require('../controller/productController');

routes.get('/', viewproduct)
routes.get('/addproduct', addProduct)
routes.get('/ajaxproductwiserecord', ajaxproduct)
routes.post('/insertproduct', insertProduct)
routes.get('/changestatus', changeStatus)
routes.get('/deleteproduct', deleteProduct)
routes.get('/editproduct', editProduct)

module.exports = routes;