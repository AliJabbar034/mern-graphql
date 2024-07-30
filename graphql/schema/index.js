const { buildSchema }= require('graphql')

module.exports=buildSchema(`
        
    type Event {
    _id:ID!
    title:String!
    description:String!
    price:Float!
    date:String!
    creator:User!
    }

    type User {
    _id:ID!
    email:String!
    password:String
    createEvents:[Event!]
    
    }

    type Booking {
    events:Event!
    user:User!
    createdAt:String!
    updatedAt:String!

    }


    input EventInput {
     title:String!
     description:String!
     price:Float!
   

    }
    input LoginInput {
    email:String!
    password:String
    }

    type AuthUser {
    email:String!
    token:String!
    expirey:String!
    }



    
    input UserInput {
    email:String!
    password:String!
    }

    type RootQuery {
        events: [Event!]!
        users:[User!]!
        bookings:[Booking!]!

    }
    type RootMutation {
        createEvent(eventInput:EventInput):Event
        createUser(userInput:UserInput):User
        bookEvent(eventId:ID!):Booking
        cancelBooking(eventId:ID!):Event
        login(loginInput:LoginInput):AuthUser

    }

    schema {
    query :RootQuery
    mutation:RootMutation

    }
    `)


  