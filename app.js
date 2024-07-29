
const express = require('express')
const bodyParser = require('body-parser')

const {graphqlHTTP}= require('express-graphql');
const  { buildSchema }= require('graphql')
const mongoose= require('mongoose')
const Event= require('./models/event');
const User = require('./models/user');



const app = express();
app.use(express.json())
require('dotenv').config()






app.use('/graphql',(graphqlHTTP({
     schema:buildSchema(`
        
        type Event {
        _id:ID!
        title:String!
        description:String!
        price:Float!
        date:String!
        }

        type User {
        _id:ID!
        email:String!
        password:String
        
        }


        input EventInput {
        title:String!
         description:String!
         price:Float!
       

        }

        
        input UserInput {
        email:String!
        password:String!
        }

        type RootQuery {
            events: [Event!]!
            users:[User!]!
        }
        type RootMutation {
            createEvent(eventInput:EventInput):Event
            createUser(userInput:UserInput):User
        }

        schema {
        query :RootQuery
        mutation:RootMutation

        }
        `),
     rootValue:{
        events:async()=>{

            const events= await Event.find(); 
            return events.map((e)=>{
                return {...e._doc}
            })
           
        },
        createEvent:async(args)=>{
        

            const event = new Event({
                title:args.eventInput.title,
                description:args.eventInput.description,
                price:args.eventInput.price,
                date:new Date()
            })
       

       
            return event.save().then((e)=>{
                
                return {...e._doc}
            }).catch((e)=>{
                console.log(e.message);
            })
       
        },
        createUser:async(args)=>{

            
          
            const user = new User({
                email:args.userInput.email,
                password:args.userInput.password
            })

           await user.save()
           

        },

     
        users:async()=>{

            const users = await User.find();

            return users.map((u)=>{
                return {...u._doc}
            })


        }

     },
     graphiql:true
    
})))


mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.9vklrcp.mongodb.net/graphql?retryWrites=true&w=majority&appName=Cluster0`).then(()=>{
    console.log("connection sucessfull");
    app.listen(5000,()=>{
        console.log("Server is listening on port 5000");
    })
}).catch((e)=>{
    console.log(e.message);
    process.exit(1)
})

