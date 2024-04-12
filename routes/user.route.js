import express from 'express';
import { test, updateUser } from '../controllers/user.controller.js';
import  {verifyUser}  from '../utils/verifyUser.js';
const router = express.Router();

router.get('/test', test);
  
  router.get('/about', (req, res) => {
    res.send('About Us');
  });

  router.post('/update/:id', verifyUser , (req,res,next)=>{
    console.log(req.user)
    res.send('Update')

  });


export default router;