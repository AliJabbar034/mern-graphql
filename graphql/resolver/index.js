const User = require('../../models/user')
const Event = require('../../models/event')
const bcrypt=require('bcryptjs')
const Booking = require('../../models/booking')
const generateToken= require('../../utils/token')

const events= async(eventIds)=>{

    const events= await Event.find({
         _id:{$in:eventIds}
     })
 
 
     return events.map((event)=>{
         return {...event._doc}
     })
 }

module.exports={
    events:async()=>{

       try {
        const events= await Event.find().populate('creator'); 
       
        return events.map((e)=>{
            return {...e._doc}
        })
       } catch (error) {
        throw error
       }
       
    },
    createEvent:async(args)=>{

try {
    
    
    const event = new Event({
        title:args.eventInput.title,
        description:args.eventInput.description,
        price:args.eventInput.price,
        date:new Date(),
        creator:"66a8763136b3bfad20633487"
    })


    await event.save();

    const userExist= await User.findById('66a8763136b3bfad20633487');
    if(!userExist){
        throw new Error("No user Found")
    }
    userExist.createEvents.push(event._id)
    await userExist.save()
    return {...event._doc}
} catch (error) {
     throw error
}

   
   
    },
    createUser:async(args)=>{

       try {
        const isUserExist= await User.findOne({email:args.userInput.email})
        if(isUserExist){
            throw new Error("User already exist with this email")
        }

        const hashdPassword= bcrypt.hashSync(args.userInput.password, 10);
      
        const user = new User({
            email:args.userInput.email,
            password:hashdPassword
        })

       await user.save()
       const {password,...rest}=user._doc
      
       return rest
        
       } catch (error) {
        throw error
       }

    },

 
    users:async()=>{

        try {
            
            const users = await User.find();



        return users.map((u)=>{
          
            return {...u._doc,createEvents:events.bind(this,u._doc.createEvents)}
        })
        } catch (error) {
            throw error
        }


    },

    bookEvent:async(args)=>{

       

        try {
            
            const booking= await Booking.create({
                events:args.eventId,
                user:'66a8763136b3bfad20633487'
            })

           
            const user=   User.findOne({_id:booking.user})
            const event= Event.findOne({_id:booking.events})




           if(!event || !user){
            throw new Error("couldn't find user or event")
           }

           
          return {...booking._doc, user:user,events:event}

        } catch (error) {
            throw error
        }


    },
    bookings:async()=>{


        const bookings =await Booking.find();

        if(bookings.length===0){
            throw new Error("No booking Found")
        }

        return bookings.map((b)=>{
            return {...b._doc,user:user.bind(this,b.user), events:event.bind(this,b.events)}
        })

    },
    cancelBooking:async(args)=>{
    try {

    const  isExist = await Booking.findOne({events:args.eventId})
    if(!isExist){
        throw new Error("Booking not exist")
    }
    
    await isExist.deleteOne();

  
    const deletedEvent= await event(isExist.events)
 

    return   {...deletedEvent._doc}

} catch (error) {
    throw error


}


    },
    login:async(args)=>{

       try {

        const {email,password}=args.loginInput
        if(!email || !password){
            throw new Error("Provide email and password")
        }

        const userExist= await User.findOne({
            email:email
        })
        if(!userExist){
            throw new Error("Invalid email or password")
        }


      

        const isMatch = bcrypt.compareSync(password, userExist.password);
        if(!isMatch){  console.log(userExist.password);
            throw new Error("Invalid email or password")
        }

        const tokn= await generateToken(userExist._id)
        if(!tokn){
            throw new Error("Token generation eror")
        }

        return {email:userExist.email,token:tokn,expirey:"30d"}


       } catch (error) {
        throw error
       }

    }
    
   
}

const user=async(userID)=>{
    
    try {

        return await User.findById(userID)
        
    } catch (error) {
        throw error
    }
}

const event= async(eventId)=>{
    try {
        
        const event= await Event.findById(eventId)
        return event
    } catch (error) {
        throw error
    }
}