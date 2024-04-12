import User from "../models/user.model.js";
import errorHandler from "../utils/error.js";

export const test=(req, res) => {
    res.json({message: 'This is the homepage'});
  };

export const updateUser=async (req,res,next)=>{

  if(req.params.id !== req.user.id)
  {
        return next(errorHandler(401, "You can only update your own account"));
  }

  try {
    
    if(req.body.password) {
      req.body.password=bcryptjs.hashSync(req.body.password,10);
    }

    const updatedUser=await User.findByIdAndUpdate(req.params.id,{
    $set:{
      username:req.body.username,
      email:req.body.email,
      password:req.body.password,
      avatar:req.body.avatar,
    }
    },{new:true} )

    const {password, ...rest}=updatedUser._doc;

    res.json(rest);
    res.status(200);
    res.message("User updated successfully");
    
  }
  catch(err)
  {
    next(err);
  }

};  