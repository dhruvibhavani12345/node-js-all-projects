const blog = require('../models/postModal');

const addblog = async (req, res) => {
    try {

        const { title, description } = req.body

        if (!title || !description || !req.file) {
            return res.status(400).send({
                success: false,
                message: "all filed is required",
            })
        }

        const users = await blog.create({
            user_id: req.user._id,
            title: title,
            description: description,
            image: req.file.path

        })
        return res.status(200).send({
            success: true,
            messsge: "blog added sucessfully",
            users
        })


    } catch (error) {
        return res.status(501).send({
            success: false,
            err: error
        })
    }
}
const viewblog = async (req, res) => {
    try {
        const users = await blog.find({ user_id:  req.user._id }).populate('user_id')
        return res.status(200).send({
            success: true,
            messsge: "blog-user fetch",
            users
        })

    } catch (error) {
        return res.status(501).send({
            success: false,
            err: error
        })
    }
}
const deleteblog=async(req, res)=>{
    try {
        const id=req.query.id;
        const users=await blog.findByIdAndDelete(id)
        return res.status(200).send({
            success : true,
            messsge:"user  sucessfully delete",
        })
    
        } catch (error) {
            return res.status(501).send({
                success : false,
                err : error
            })
        }
}
const updateblog=async(req, res)=>{
    try {
        const {id,title,description}=req.body
  
     
        if (req.file) {
            let single = await blog.findById(id)
            console.log(single);
            
            fs.unlinkSync(single.image)

            users= await blog.findByIdAndUpdate(id, {
                title:title,
                description:description,
                image:req.file.path
            })
        console.log( users);
        
    return res.status(200).send({
            sucess:true,
            message:"user successfully update",
            users
        })

        }
        else {
            let single = await blog.findById(id)

            users= await blog.findByIdAndUpdate(id, {
                title:title,
                description:description,
                image: single.image
            })
            console.log(users);
            
            return res.status(200).send({
                sucess:true,
                message:"user successfully update",
                users
            })

        }
    
    } catch (error) {
        return res.status(501).send({
            success : false,
            err : error.message
        })
    }
    
}
module.exports={
    addblog ,viewblog , deleteblog , updateblog
}