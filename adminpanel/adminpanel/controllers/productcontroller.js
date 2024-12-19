const CategoryModel = require("../models/categorymodel");
const SubCategoryModel = require("../models/subcategorymodel");
const ExSubCategoryModel = require("../models/exsubcategorymodel");
const ProductModel = require("../models/productmodel");

const fs = require('fs')
const path = require('path')


const productPage = async (req, res) => {
  try {
    const product = await ProductModel.find({}).populate("categoryId").populate("subcategoryId").populate("exsubcategoryId");

    return res.render("product/view_product", {
      product: product,
    });
  } catch (err) {
    console.log(err);
    return false;
  }
};
const addproductPage = async (req, res) => {
  try {
    const category = await CategoryModel.find({});
    const subcategory = await SubCategoryModel.find({});
    const exsubcategory = await ExSubCategoryModel.find({});

    return res.render("product/add_product", {
      category: category,
      subcategory: subcategory,
      exsubcategory: exsubcategory,
    });
  } catch (err) {
    console.log(err);
    return false;
  }
};
const addProduct = async (req, res) => {
  try {
    await ProductModel.create({
      categoryId: req.body.category,
      subcategoryId: req.body.subcategory,
      exsubcategoryId: req.body.exsubcategory,
      name: req.body.product,
      price: req.body.price,
      description: req.body.desc,
      image: req.file.path
    });
    req.flash("sucess", "Product successfully add")

    return res.redirect("/product");
  } catch (err) {
    console.log(err);
    return false;
  }
};

const deleteProduct = async (req, res) => {
  try {
    const id = req.query.id;
    await ProductModel.findByIdAndDelete(id);
    req.flash('success', "product Successfully delete");
    return res.redirect('/product');
  } catch (err) {
    console.log(err);
    return false;
  }
}
const editProduct = async (req, res) => {
  try {
    const id = req.query.id;
    let category = await CategoryModel.find({});
    let subcategory = await SubCategoryModel.find({});
    let exsubcategory = await ExSubCategoryModel.find({});
    let single = await ProductModel.findById(id).populate("categoryId").populate("subcategoryId").populate("exsubcategoryId");
    return res.render('product/edit_product', {
      category,
      subcategory,
      exsubcategory,
      single
    })
  } catch (err) {
    console.log(err);
    return false;
  }
}

const updateProduct = async (req, res) => {
 try{
    const {editid, category, subcategory, exsubcategory , name, price, product,description} = req.body;
    if(req.file){
      const single = await ProductModel.findById(editid)
        fs.unlinkSync(single.image)
        await ProductModel.findByIdAndUpdate(editid,{
          categoryId : category,
          subcategoryId : subcategory,
          exsubcategoryId : exsubcategory,
          name : name,
          price : price,
          description : description,
          image : req.file.path,
        })
        return res.redirect('/product');
      
    }else{
      const single = await ProductModel.findById(editid)
      
      await ProductModel.findByIdAndUpdate(editid,{
        categoryId : category,
        subcategoryId : subcategory,
        exsubcategoryId : exsubcategory,
        name : name,
        price : price,
        description : description,
        image : single.image,
      })
      return res.redirect('/product');
    
    }
 }catch(err){
  console.log(err);
  return false;
 }
}

const changeStatus = async (req, res) => {
  try {
    const status = req.query.status;
    const id = req.query.id;
    if (status == "active") {
      await ProductModel.findByIdAndUpdate(id, { status: "deactive" })
      req.flash('success', "Status Successfully changed");
      return res.redirect('/product')
    } else {
      await ProductModel.findByIdAndUpdate(id, { status: "active" })
      req.flash('success', "Status Successfully changed");
      return res.redirect('/product')
    }
  } catch (err) {
    console.log(err);
    return false;
  }
}

const ajaxgetCategory = async(req,res)=>{
  try{
    let id = req.query.id;
    let category = await SubCategoryModel.find({categoryId:id});
    return res.send({
      success : true,
      message : " record fetch",
      category
    })
  }catch(err){
    console.log(err);
    return false;
  }
}

const ajaxgetsubCategory =  async(req,res)=>{
  try{
    let id = req.query.id;
    let subcategory = await ExSubCategoryModel.find({subcategoryId:id});
    return res.send({
      success : true,
      message : "record fetch",
      subcategory,
    })
  } catch(err){
    console.log(err);
    return false;
  }

}
module.exports = {
  productPage,
  addproductPage,
  addProduct, deleteProduct, editProduct, updateProduct, changeStatus , ajaxgetCategory , ajaxgetsubCategory
};
