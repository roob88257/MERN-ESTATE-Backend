import express from 'express';
import { test } from '../controllers/user.controller.js';
const router = express.Router();

router.get('/test', test);
  
  router.get('/about', (req, res) => {
    res.send('About Us');
  });


export default router;