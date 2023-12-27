import express from 'express';
const router = express.Router();

router.get('/test', (req, res) => {
    res.json({message: 'This is the homepage'});
  });
  
  router.get('/about', (req, res) => {
    res.send('About Us');
  });


export default router;