
const usermodels = require('../models/UserModel')

const path = require('path')
const fs = require('fs')
const bloguser = require('../models/blogsdata')

const registerpage = (req, res) => {
    return res.render('res')
}
const loginpage = (req, res) => {
    return res.render('login')
}

const registerusers = async (req, res) => {
    try {
        const { name, email, password } = req.body
        await usermodels.create({
            name: name,
            email: email,
            password: password,
        })
        return res.redirect('/login')
    } catch (error) {
        console.log(error);
    }
}

const loginuser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await usermodels.findOne({ email: email });

        if (!user || user.password != password) {
            console.log("email and password is not match");
            return false;
        }
        res.cookie('auth', user)
        return res.redirect('/dashboard')
    } catch (err) {
        console.log(err);
        return false;
    }
}

const dashboardpage = async (req, res) => {
    try {
        const { name, description, image } = req.body

        const user = await bloguser.find({});

        return res.render('dashboard', {
            user
        });

    } catch (error) {
        console.log(err);
        return false;
    }
};

const addblog = (req, res) => {
    return res.render('add')
}

const addblougesdata = async (req, res) => {
    try {
        const { name, description } = req.body
        const user = await bloguser.create({
            name: name,
            description: description,
            image: req.file.path
        })
        return res.redirect('dashboard')
    } catch (err) {
        console.log(err);
        return false;
    }
}

const deletdata = async (req, res) => {
    try {

        let id = req.params.id;
        let single = await bloguser.findById(id);
        fs.unlinkSync(single.image);
        await bloguser.findByIdAndDelete(req.params.id);
        console.log(`user delete`)
        return res.redirect('/dashboard');
    } catch (err) {
        console.log(err);
        return false;
    }
}

const editpage = async (req, res) => {
    try {
        let id = req.params.id;

        let single = await bloguser.findById(id);
        return res.render('edit', {
            single
        })
    } catch (err) {
        console.log(err);
        return false;
    }
}

const update = async (req, res) => {
    try {
        const { id, name, description } = req.body;
        if (req.file) {
            let single = await bloguser.findById(id);
            fs.unlinkSync(single.image);
            await bloguser.findByIdAndUpdate(id, {
                name: name,
                description: description,
                image: req.file.path
            })
            console.log("record update");
            return res.redirect('/dashboard');
        } else {
            const { id, name, description } = req.body;
            let single = await bloguser.findById(id);

            const up = await bloguser.findByIdAndUpdate(id, {
                name: name,
                description: description,
                image: single.image
            })
            console.log("user update");
            return res.redirect('/dashboard')
        }
    } catch (err) {
        console.log(err);
        return false;
    }
}

const logout = async (req, res) => {
    return res.clearCookie('auth').redirect('/');
}

const readmore = async (req,res) => {
    try {
        let id = req.params.id
        console.log(id);
       
        
        let single = await bloguser.findById(id);
        return res.render('readmore', {
            single
        })
    } catch (err) {
        console.log(err);
        return false;
    }
}


module.exports = {
    registerpage, registerusers, loginpage, loginuser, dashboardpage, addblog, addblougesdata, deletdata, editpage, update, logout, readmore
}