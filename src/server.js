'use strict'
const express=require('express');
require('dotenv').config();
const PORT=process.env.PORT||3010;
const server=express();
const notfound=require('./middleware/404');
const generalerror=require('./middleware/500');
const userRoute=require('./auth/router')
server.use(express.json());


server.get("/", home);
function home(req, res) {
    res.status(200).send("welcome home");
}
server.use(userRoute);
server.use(generalerror) ;
server.use('*',notfound)  ;  
function start(){

server.listen(PORT,(req,res)=>{console.log(`hi in ${PORT}`)})};
module.exports={start,server}
