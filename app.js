
const express = require('express')


const {graphqlHTTP}= require('express-graphql');
const mongoose= require('mongoose')



const schemas=require('./graphql/schema/index')
const rootValue=require('./graphql/resolver/index');
const authentication = require('./middleware/authentication');


const app = express();
app.use(authentication)
app.use(express.json())
require('dotenv').config()







app.use('/graphql',(graphqlHTTP({
     schema:schemas,
     rootValue:rootValue,
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

