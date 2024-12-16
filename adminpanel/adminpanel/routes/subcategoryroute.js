const express = require('express');

const routes = express.Router();

const { subcategoryPage, addSubcategoryPage, addSubCategory, deleteSubCategory, changeStatus, editSubCategory, updateSubCategory } = require('../controllers/subcategorycontroller');


routes.get('/', subcategoryPage);
routes.get('/add', addSubcategoryPage);
routes.post('/addSubCategory', addSubCategory);
routes.get('/changeStatus', changeStatus);
routes.get('/delete', deleteSubCategory);
routes.get('/edit', editSubCategory);
routes.post('/update', updateSubCategory);

module.exports = routes;