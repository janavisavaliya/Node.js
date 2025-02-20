const express = require('express');

const routes = express.Router();

routes.use('/',require('./blogRoute'));

module.exports = routes;