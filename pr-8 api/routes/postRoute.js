const express=require("express")
const {  addblog, viewblog, deleteblog , updateblog } = require("../controllers/postController")
const { verifyToken, } = require('../middleware/Auth');


const routes=express.Router()

const multer = require('multer');

const st = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, 'uploads')
},
filename: (req, file, cb) => {
    const uniqname = Date.now();
    cb(null, `${file.fieldname}-${uniqname}`);
}
})
  
  const upload = multer({ storage: st }).single('image')

routes.post('/addblog',verifyToken,upload,addblog);
routes.get('/viewblog',verifyToken,viewblog);
routes.delete('/deleteblog',verifyToken,deleteblog);
routes.put('/updateblog',verifyToken,upload,updateblog)

module.exports= routes
