const jwt=require('jsonwebtoken')
 module.exports=generateToken =(id)=>{


    const token= jwt.sign({_id:id},process.env.SECRET_KEY, {
        expiresIn:'30d'
    })

    return token

}

