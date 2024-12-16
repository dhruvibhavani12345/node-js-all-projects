
const CategoryModel = require('../models/categorymodel');
const SubcategoryModel = require('../models/subcategorymodel');
const ExSubcategoryModel = require('../models/exsubcategorymodel');


const routes = require('../routes/exsubcategoryroute');

const exsubcategory = async (req, res) => {
    try {
        let exsubcategory = await ExSubcategoryModel.find({}).populate('categoryId').populate('subcategoryId');
        return res.render('exsubcategory/view_exsubcategory', {
          exsubcategory
        })

    } catch (err) {
        console.log(err);
        return false
    }
}

const addExSubcategory = async (req, res) => {
    try {
      const category = await CategoryModel.find({});
      const subcategory = await SubcategoryModel .find({});
      return res.render("exsubcategory/add_exsubcategory",{
          category,
          subcategory
      });
    } catch (err) {
      console.log(err);
      return false;
    }
  };

const insertexSubcategory = async(req,res)=>{
  try{
    const { category , subcategory , exsubcategory } = req.body;
    await ExSubcategoryModel.create({
      categoryId : category,
      subcategoryId : subcategory,
      exsubcategory : exsubcategory,
    })
    console.log("subcategory create");
    return res.redirect('/exsubcategory')
  }catch(err){
    console.log(err);
    return false;
  }
}
const deleteexsubCategory= async (req,res)=>{
  try{
    const id = req.query.id;
    await ExSubcategoryModel.findByIdAndDelete(id);
    return res.redirect('/exsubcategory');
  }catch(err){
    console.log(err);
    return false;
  }
}

const editexsubCategory = async(req,res)=>{
  try{
   const id =req.query.id;
   let category = await CategoryModel.find({});
   let subcategory = await SubcategoryModel.find({});
   let single = await ExSubcategoryModel.findById(id).populate("categoryId").populate("subcategoryId");
   return res.render('exsubcategory/edit_exsubcategory',{
    category,
    subcategory,
    single
   })
  }catch(err){
    console.log(err);
    return false;
  }
}

const updateexsubCategory = async (req,res)=>{
  try{
    const {editid, category , subcategory , exsubcategory} = req.body;
    await ExSubcategoryModel.findByIdAndUpdate(editid,{
      category : category,
      subcategory: subcategory , 
      exsubcategory : exsubcategory,
    })
    return res.redirect('/exsubcategory')
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
          await ExSubcategoryModel.findByIdAndUpdate(id, { status: "deactive" })
          req.flash('success', "Status Successfully changed");
          return res.redirect('/exsubcategory')
      } else {
          await ExSubcategoryModel.findByIdAndUpdate(id, { status: "active" })
          req.flash('success', "Status Successfully changed");
          return res.redirect('/exsubcategory')
      }
  } catch (err) {
      console.log(err);
      return false;
  }
}

module.exports = {
    exsubcategory, addExSubcategory ,insertexSubcategory , deleteexsubCategory , editexsubCategory , updateexsubCategory ,changeStatus, 
  };