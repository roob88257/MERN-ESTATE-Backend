

const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

// const uri = "mongodb+srv://traj88257:<password>@cluster0.u4dus7o.mongodb.net/?retryWrites=true&w=majority";

// rajestate

mongoose.connect(process.env.MONGO);

const app = express();

app.listen(5000, () => {
    console.log(`Server is running at port 5000 !!!!`);
   
  });