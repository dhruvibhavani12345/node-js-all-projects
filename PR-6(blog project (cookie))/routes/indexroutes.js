const express = require('express');

const routes = express.Router();

const { loginPage, registerPage, dashboardPage, registerUser, loginUser, logoutUser, carProduct, bikeProduct, cycleProduct, makeupProduct,  
    addProduct, addRecord, deleteRecord, viewPage, editRecord, updateRecord
 } = require('../controllers/Authcontroller');

const multer = require('multer');

const st = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, './uploads')
    },
    filename: (req, file, cb) => {
        const uniq = Math.floor(Math.random() * 100000000);
        cb(null, `${file.fieldname}-${uniq}`);
    }
})

const upload = multer({ storage: st }).single('image');

routes.get('/', registerPage)
routes.get('/login', loginPage)
routes.get('/dashboard', dashboardPage)
routes.post('/registeruser', registerUser)
routes.post('/loginuser', loginUser)
routes.get('/logout', logoutUser)
routes.get('/product/Cars',carProduct)
routes.get('/product/Bikes',bikeProduct)
routes.get('/product/Cycles',cycleProduct)
routes.get('/product/Makeup%20Products',makeupProduct)

routes.get('/add-product',addProduct)
routes.post('/insertRecord', upload, addRecord);
routes.get('/deleteRecord', deleteRecord);
routes.get('/view', viewPage);
routes.get('/editRecord', editRecord);
routes.post('/updateRecord', upload, updateRecord);


module.exports = routes; 