const express = require('express');
const { exsubcategory ,addExSubcategory , insertexSubcategory ,deleteexsubCategory , editexsubCatagory,updateexsubCategory, changeStatus} = require('../controllers/exsubcategorycontroller');

const routes = express.Router();


routes.get('/', exsubcategory);
routes.get('/add', addExSubcategory);
routes.post('/insertexsubcategory',insertexSubcategory);
routes.get('/deleteexsubcategory', deleteexsubCategory);
routes.get('/editexsubcatagory', editexsubCatagory);
routes.post('/updateexsubcategory',updateexsubCategory);
routes.get('/changeStatus', changeStatus);

module.exports = routes;