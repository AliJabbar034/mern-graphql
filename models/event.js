const mongoose= require('mongoose')



const eventSchema= new mongoose.Schema({

    title:{
        type:String,
        required:[true,"Provide title"]
    },
    description:{
        type:String,
        required:[true,"Provide description"]
    },
    price:{
        type:Number,
        required:[true,"Provide price"]
    },
    date:{
        type:Date,
        required:true
    },
    creator:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }

})

  const Event=mongoose.model('Event',eventSchema)
  module.exports=Event