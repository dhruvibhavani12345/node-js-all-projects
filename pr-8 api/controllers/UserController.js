const UserModel = require('../models/UserModel');
const addUser = async(req,res) => {
        try{
            const {name,email,password,city,phone} = req.body;
            if(!name || !email || !password || !city || !phone){
                return res.status(500).send({
                    success : false,
                    message : "All filed is required",
                })
            }
            let dup = await UserModel.findOne({email : email});
            if(dup){
                return res.status(200).send({
                    success : false,
                    message : "user is already register",
                })
            }
            let user = await UserModel.create({
                name : name,
                email : email,
                password : password,
                city : city,
                phone : phone
            })
            return res.status(200).send({
                success : true,
                message : "user successfully create",
                user,
               
            })
        }catch(err){
            return res.status(501).send({
                success : false,
                err : err
            })
        }
}
const viewUser = async(req,res) => {
    try{
        let users = await UserModel.find({});
        
        return res.status(200).send({
            success : true,
            length : users.length,
            message : "user successfully fetch",
            users,
        })
    }catch(err){
        return res.status(501).send({
            success : false,
            err : err
        })
    }
}
const deleteUser = async(req,res) => {
    try{
        let id = req.query.id;
        console.log(id);
        
        await UserModel.findByIdAndDelete(id);
        return res.status(200).send({
            success : true,
            message : "user successfully delete",
        })
        
    }catch(err){
        console.log(err);
        return false;
        
    }
}
const updateUser = async(req,res) => {
    try{
        const {id,name,email,password,city,phone} = req.body;
        if(!name || !email || !password || !city || !phone){
            return res.status(500).send({
                success : false,
                message : "All filed is required",
            })
        }
        await UserModel.findByIdAndUpdate(id,{
            name : name,
            email : email,
            password:password,
            city : city,
            phone : phone
        });
        return res.status(200).send({
            success : true,
            message : "user successfully update",   
        })
    }catch(err){
        return res.status(501).send({
            success : false,
            err : err
        })
    }
}
module.exports = {
    addUser ,viewUser ,deleteUser , updateUser
}