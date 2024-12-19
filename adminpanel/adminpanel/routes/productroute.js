const express = require('express');

const {
  productPage,addproductPage,addProduct, deleteProduct,editProduct,updateProduct, changeStatus , ajaxgetsubCategory ,  ajaxgetCategory} = require("../controllers/productcontroller");

const routes = express.Router();

const multer = require('multer');

const st = multer.diskStorage({
     destination:(req,file,cb) => {
      cb(null,"uploads");
     },
     filename:(req,file,cb) => {
      let uniq = Date.now()
       cb(null,`${file.fieldname}-${uniq}`)
     }
})

const uploadFile = multer({ storage: st }).single("image");

routes.get('/',productPage)
routes.get("/add", addproductPage);
routes.post("/add", uploadFile, addProduct);
routes.get('/deleteproduct', deleteProduct);
routes.get('/edit', editProduct);
routes.post('/updateproduct',uploadFile, updateProduct);
routes.get('/changeStatus', changeStatus);
routes.get('/ajaxgetsubcategory', ajaxgetsubCategory);
routes.get('/ajaxgetcategory', ajaxgetCategory);

module.exports = routes;