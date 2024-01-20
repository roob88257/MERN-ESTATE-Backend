import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup=async(req, res, next) => {
   const {username,email,password} = req.body;

    const hashedPassword = bcryptjs.hashSync(password,10);

   const newUser=new User({username,email,password: hashedPassword});
   
   await newUser.save().then(()=>{
    res.status(200).json("User created successfully !!")
   }).catch(err => {

    next(err);
   });

   // console.log(req.body);

  };


  export const signin =async(req, res, next) => {

    const {email,password}=req.body;

    try {

    
    const verifiedUser= await User.findOne({email: email});

    if(!verifiedUser)
    {
        return next(errorHandler(404, "User not found"));
    }

    const validPassword= bcryptjs.compareSync(password,verifiedUser.password);

    if(!validPassword)
    {
        return next(errorHandler(401, "Wrong Credentials"));
    }
    
    const token= jwt.sign({id: verifiedUser._id},process.env.JWT_SECRET); 

    // console.log(verifiedUser);

    const {password:pass, ...rest}=verifiedUser._doc;


    // console.log(token); 
    console.log(rest);
    res.cookie('acess_token', token, { httpOnly: true });
    res.status(200);
    res.json(rest);
}
catch (err) {
    console.log(err);
}

  }


  export const google=async (req,res,next)=>{
    
    const {email,username,image} = req.body;
    try {
         
        const user= await User.findOne({email: email});

        if(user)
        {
              const token= jwt.sign({id: username._id}, process.env.JWT_SECRET);
              const {password:pass, ...rest}=user._doc;
              res.cookie('access_token', token, {httpOnly:true})
              res.status(200);
              res.json(rest);
        }
        else
        {
         
            const generatedPassword= Math.random().toString(36).slice(-8)+Math.random().toString(36).slice(-8);
        const hashedPassword=bcryptjs.hashSync(generatedPassword,10);
        const newUser=new User({username:username.split(" ").join("").toLowerCase()+Math.random().toString(36).slice(-8),email,password:hashedPassword,avatar:image});

        await newUser.save();

         const token=jwt.sign({id:newUser._id}, process.env.JWT_SECRET);
         const {password:pass, ...rest}= newUser._doc;
          
         res.cookie('access_token', token, {httpOnly:true})
              res.status(200);
              res.json(rest);
        }

 


      }
      catch (err){
       next(err);
      }
       

  }
