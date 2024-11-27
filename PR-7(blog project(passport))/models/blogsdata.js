const mongoose=require('mongoose')


const userschama=mongoose.Schema({
    description:{
        type:String,
        require:true
    },
    name:{
        type:String,
        require:true
    },
    image:{
        type:String,
        require:true
    }

})

const blogeuser =mongoose.model('bloguser',userschama)

module.exports=blogeuser    