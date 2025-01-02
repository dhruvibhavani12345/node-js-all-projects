const express=require("express")
const {  addComment } = require("../controllers/commentController")
const { verifyToken, } = require('../middleware/Auth');


const routes=express.Router()


routes.post('/addcomment',verifyToken,addComment);

module.exports= routes
