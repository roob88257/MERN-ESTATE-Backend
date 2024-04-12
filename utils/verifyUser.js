import errorHandler from "./error.js";
import jwt from 'jsonwebtoken'; 


export const verifyUser=(req,res,next)=>{

   const token = req.cookies.access_token;
   console.log("verifyUser")
   console.log(token);

   if(!token)
   {
        return next(errorHandler(401,'Unauthorized'));
   }

   jwt.verify(token,process.env.JWT_SECRET, (error,user)=>{
    if(err)
    {
        return next(errorHandler(403,'Forbidden'));
    }
    
    
    res.user= user;
    next();
    
   })

 next();   
}

