

const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();



mongoose.connect(process.env.MONGO)

const app = express();

app.listen(5000, () => {
    console.log(`Server is running at port 5000 !!!!`);
   
  });