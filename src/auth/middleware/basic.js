"use strict";
const bcrypt = require('bcrypt');
const base64 = require('base-64');
const {Users}=require('../models/index')
module.exports = async (req, res, next) => {
    console.log(req.body)
    try {
        const encodedHeaders = req.headers.authorization.split(" ")[1]; // "Basic dGFtaW06cGl6emE="
     
        const [username, password] = base64.decode(encodedHeaders).split(":"); // spread operator
        // console.log("username: ", username);
        // console.log("password: ", password); // password in plain text after base64 decoding
    
        // get the user form the database
        const user = await Users.findOne({ where: { username } });
       
        // compare the users' password from the DB with the on that was submitted in the form
        const valid = await bcrypt.compare(password, user.password);
       
        if (valid) {
          res.status(200).json({user:user});
          next()
        } else {
          res.status(500).json({ error: "username or password incorrect!" });
          next()
        }
      } catch (error) {
        res.status(403).send("An Error Occurred!");
      }
};


