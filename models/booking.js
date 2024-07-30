const { default: mongoose, mongo } = require("mongoose");



const bookingSchema= new mongoose.Schema({
    events:{
        type:mongoose.Types.ObjectId,
        ref:'Event'
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    }
},{
    timestamps:true
})

const Booking= mongoose.model('Booking',bookingSchema)
module.exports=Booking