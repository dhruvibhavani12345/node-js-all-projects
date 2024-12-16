const CategoryModel = require("../models/categorymodel");
const SubCategoryModel = require("../models/subcategorymodel");
const ExSubCategoryModel = require("../models/exsubcategorymodel");
const ProductModel = require("../models/productmodel");


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
      let single = await ProductModel.findById(id);
      return res.render('product/edit_product', {
          single
      });
  } catch (err) {
      console.log(err);
      return false;
  }
}

const updateProduct = async (req, res) => {
  try {
      await ProductModel.findByIdAndUpdate(req.body.editid, {
          product: req.body.product
      })
      req.flash('success', "product Successfully update");
      return res.redirect('/product');
  } catch (err) {
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
module.exports = {
  productPage,
  addproductPage,
  addProduct,deleteProduct, editProduct, updateProduct, changeStatus
};
