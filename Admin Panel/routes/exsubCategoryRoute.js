const express = require('express');

const routes = express.Router();

const { addexsubcategorypage, ajaxCategorywiseRecord, insertExsubcategory, viewExsubcategorypage, editExsubcategory } = require('../controller/ExsubcategoryController');

routes.get('/', viewExsubcategorypage)
routes.get('/addexsubcategorypage', addexsubcategorypage)
routes.get('/ajaxcategorywiserecord', ajaxCategorywiseRecord);
routes.post('/insertexsubcategory', insertExsubcategory);
routes.get('/editexsubcategory', editExsubcategory)


module.exports = routes;