import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

dotenv.config();
mongoose.connect(process.env.MONGO).then(()=>{
console.log("Connected to MONGODB");
}).catch((err)=>{
console.log(err);
})

const app = express();


app.use(cookieParser());

app.use(cors());


app.listen(5000, () => {
    console.log(`Server is running at port 5000 !!!!`);
   
  });

  app.use(express.json());
  app.use('/api/user', userRouter);
  app.use('/api/auth', authRouter);
 

  app.use((err,req,res,next)=>{
    const statusCode=err.statusCode || 500;
    const message=err.message || "Server error";

    return  res.status(statusCode).json({ 
      success: false,
      statusCode: statusCode,
      message: message,
     });
  });