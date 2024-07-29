

const mongoose= require('mongoose')


const userSchema= new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:[true,"Provide the password"]
    },
    createEvents:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Event'
        }
    ]
})


const User=mongoose.model('User',userSchema)
module.exports=User