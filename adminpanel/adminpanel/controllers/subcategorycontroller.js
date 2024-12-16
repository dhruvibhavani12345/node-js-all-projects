const CategoryModel = require('../models/categorymodel');
const SubCategoryModel = require('../models/subcategorymodel');

const subcategoryPage = async (req, res) => {
    try {
        let subcategory = await SubCategoryModel.find({}).populate("categoryId");
        return res.render('subcategory/view_subcategory', {
            subcategory: subcategory
        })
    } catch (err) {
        console.log(err);
        return false
    }

}
const addSubcategoryPage = async (req, res) => {
    try {
        let category = await CategoryModel.find({ status: 'active' });
        
        return res.render('subcategory/add_subcategory', {
            category: category
        });
    } catch (err) {
        console.log(err);
        return false;
    }

}
const addSubCategory = async (req, res) => {
    try {
        const { category, subcategory } = req.body;
        await SubCategoryModel.create({
            categoryId: category,
            subcategory: subcategory
        })
        req.flash('success', "subcategory successfully add");
        return res.redirect('/subcategory/add');
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
            await SubCategoryModel.findByIdAndUpdate(id, { status: "deactive" })
            req.flash('success', "Status Successfully changed");
            return res.redirect('/subcategory')
        } else {
            await SubCategoryModel.findByIdAndUpdate(id, { status: "active" })
            req.flash('success', "Status Successfully changed");
            return res.redirect('/subcategory')
        }
    } catch (err) {
        console.log(err);
        return false;
    }
}
const deleteSubCategory = async (req, res) => {
    try {
        const id = req.query.id;
        await SubCategoryModel.findByIdAndDelete(id);
        req.flash('success', "Subcategory Successfully delete");
        return res.redirect('/subcategory');
    } catch (err) {
        console.log(err);
        return false;
    }
}
const editSubCategory = async (req, res) => {
    try {
        const id = req.query.id;
        let category = await CategoryModel.find({ status: 'active' });
        const single = await SubCategoryModel.findById(id).populate('categoryId');
        return res.render('subcategory/edit_subcategory', {
            category: category,
            single: single
        });
    } catch (err) {
        console.log(err);
        return false;
    }
}
const updateSubCategory = async (req, res) => {
    try {
        const { editid, category, subcategory } = req.body;
        await SubCategoryModel.findByIdAndUpdate(editid, {
            categoryId: category,
            subcategory: subcategory
        })
        req.flash('success', "subcategory successfully update");
        return res.redirect('/subcategory');
    } catch (err) {
        console.log(err);
        return false;
    }
}

module.exports = {
    subcategoryPage, addSubcategoryPage, addSubCategory, changeStatus, deleteSubCategory, editSubCategory, updateSubCategory
}