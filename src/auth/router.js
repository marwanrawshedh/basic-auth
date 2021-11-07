"use strict";
const express = require("express");
const userRoute = express.Router();
const {Users}=require('./models/index')

const bcrypt = require('bcrypt');
// server.use(express.json());
const basicAuth=require('./middleware/basic')
userRoute.post("/sign-up", async (req, res) => {
  // we need to parse the data from the body req
  try {
      // hash the password within the req body
      req.body.password = await bcrypt.hash(req.body.password, 5);
      console.log(req.body)
    // create the new user Record
    const record = await Users.create(req.body);
   
    res.status(201).json({user:record});
  } catch (error) { console.log(error);
    res.status(403).send("Error occurred");
  }
});

userRoute.post("/sign-in", basicAuth,async (req, res) => {
  
});

module.exports = userRoute;
