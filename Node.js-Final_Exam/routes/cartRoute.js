const express = require('express');

const routes = express.Router();
const { viewcartPage, addToCart, updateCart, removeFromCart } = require('../controller/cartController');

routes.get('/', viewcartPage);
routes.post('/add', addToCart);
routes.post('/update', updateCart);
routes.post('/remove', removeFromCart);

module.exports = routes;
