const mongoose=require('mongoose')

const userschema=mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
       ref:'user'
    },
    title:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    image:{
        type:String,
        require:true
    }
})
const blog=mongoose.model('blog',userschema)
module.exports=blog