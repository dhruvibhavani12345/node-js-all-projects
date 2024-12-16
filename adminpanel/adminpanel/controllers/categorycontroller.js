const CategoryModel = require('../models/categorymodel');

const categoryPage = async (req, res) => {
    try {
        let category = await CategoryModel.find({});
        return res.render('category/view_category', {
            category: category
        })
    } catch (err) {
        console.log(err);
        return false;
    }
}
const addCategory = (req, res) => {
    return res.render('category/add_category')
}
const insertCategory = async (req, res) => {
    try {
        const category = req.body.category;
        await CategoryModel.create({
            category: category
        })
        req.flash('success', "Category Successfully add");
        return res.redirect('/category/add');
    } catch (err) {
        console.log(err);
        return false;
    }
}

const deleteCategory = async (req, res) => {
    try {
        const id = req.query.id;
        await CategoryModel.findByIdAndDelete(id);
        req.flash('success', "Category Successfully delete");
        return res.redirect('/category');
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
            await CategoryModel.findByIdAndUpdate(id, { status: "deactive" })
            req.flash('success', "Status Successfully changed");
            return res.redirect('/category')
        } else {
            await CategoryModel.findByIdAndUpdate(id, { status: "active" })
            req.flash('success', "Status Successfully changed");
            return res.redirect('/category')
        }
    } catch (err) {
        console.log(err);
        return false;
    }
}
const editCategory = async (req, res) => {
    try {
        const id = req.query.id;
        let single = await CategoryModel.findById(id);
        return res.render('category/edit_category', {
            single
        });
    } catch (err) {
        console.log(err);
        return false;
    }
}
const updateCategory = async (req, res) => {
    try {
        await CategoryModel.findByIdAndUpdate(req.body.editid, {
            category: req.body.category
        })
        req.flash('success', "Category Successfully update");
        return res.redirect('/category');
    } catch (err) {
        console.log(err);
        return false;
    }
}
module.exports = {
    categoryPage, addCategory, insertCategory, deleteCategory, changeStatus, editCategory, updateCategory
}