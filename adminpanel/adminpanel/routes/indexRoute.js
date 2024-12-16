const express = require('express');

const routes = express.Router();

routes.use('/',require('./authRoute'));
routes.use('/category',require('./categoryroute'));
routes.use('/subcategory', require('./subcategoryroute'));
routes.use('/exsubcategory', require('./exsubcategoryroute'));
routes.use('/product',require('./productroute'));

module.exports = routes;