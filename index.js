'use strict'
const {start}=require('./src/server')
const {db}=require('./src/auth/models/index')
db.sync().then(() => {
    // kickstart the server
    start(); // will start our server
  }).catch(console.error);