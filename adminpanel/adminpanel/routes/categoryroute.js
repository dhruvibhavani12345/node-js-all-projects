const express = require('express');

const routes = express.Router();

const { categoryPage, addCategory, insertCategory, deleteCategory, editCategory, updateCategory, changeStatus } = require('../controllers/categorycontroller');

routes.get('/', categoryPage);
routes.get('/add', addCategory);
routes.post('/addCategory', insertCategory);
routes.get('/deletecategory', deleteCategory);
routes.get('/editcategory', editCategory);
routes.post('/updateCategory', updateCategory);
routes.get('/changeStatus', changeStatus);

module.exports = routes;