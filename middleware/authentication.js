const jwt= require('jsonwebtoken')

module.exports= async(req,res,next)=>{

    const authtoken= req.get['Authorization']
    if(!authtoken){
        req.isAuth=false
        return next()
    }

    const token= authtoken.split(' ')[1]
    if(!token || token===""){
        req.isAuth=false;
        return next();
    }

try {
    
const decodedToken= jwt.verify(token,process.env.SECRET_KEY);

if(!decodedToken){
    req.isAuth=false
    return next()
}

req.isAuth=true;
req.userId=decodedToken._id

} catch (error) {
    req.isAuth=false
    return next()
}



}

