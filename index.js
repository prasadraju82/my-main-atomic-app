// import express from "express";
// import bodyParser from "body-parser";
// import mongoose from "mongoose";
// import cors from "cors";

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose=require('mongoose');

const db = {};

const Role = require('./model/role.js');
const user = require('./model/user.js');
// import user from './model/user.js';

// require('./routes/auth')(app);

const app = express();

app.use(bodyParser.json({limit:"20mb", extended: true}));
app.use(bodyParser.urlencoded({limit:"20mb", extended: true}));

var corsOptions = {
    origin: 'https://my-atomic-app.netlify.app'
  };

app.use(cors(corsOptions));

const CONNECTION_STRING = 'mongodb://rajuprasad:itsmyPassw0rd%402021@cluster0-shard-00-00.hbcjj.mongodb.net:27017,cluster0-shard-00-01.hbcjj.mongodb.net:27017,cluster0-shard-00-02.hbcjj.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-cn8i28-shard-0&authSource=admin&retryWrites=true&w=majority';
//const CONNECTION_STRING = 'mongodb://localhost:27017/';
//mongodb://rajuprasad:itsmyPassw0rd%402021@cluster0-shard-00-00.hbcjj.mongodb.net:27017,cluster0-shard-00-01.hbcjj.mongodb.net:27017,cluster0-shard-00-02.hbcjj.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-cn8i28-shard-0&authSource=admin&retryWrites=true&w=majority

const port = process.env.PORT || 5000;
require('./routes/auth')(app);
require('./routes/projects')(app);
require('./routes/tasks')(app);
require('./routes/activity')(app);
require('./routes/worklog')(app);
require('./routes/common')(app);
require('./routes/user')(app);
// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to my application." });
  });

mongoose.connect(CONNECTION_STRING,{
    useNewUrlParser: true, useUnifiedTopology: true
}).then(() =>{ 
    
    app.listen(port, () => 
        console.log(`Connection is established and running on port: ${port}`)
);
initial();
}
).catch((err) => console.log('error in connecting ' + err.message));


// app.listen(port, () => console.log(`Connection is established and running on port: ${port}`))
function initial() {
    Role.estimatedDocumentCount((err, count) => {
      if (!err && count === 0) {
        new Role({
          name: "user"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'user' to roles collection");
        });
  
        new Role({
          name: "moderator"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'moderator' to roles collection");
        });
  
        new Role({
          name: "admin"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'admin' to roles collection");
        });
      }
    });
  }

//mongoose.set('useFindAndModify', false);