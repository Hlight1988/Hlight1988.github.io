const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');


const server = express();

// 连接mongodb
const db = require('./config/key').mongoURL
mongoose.connect(
    db,
    { useNewUrlParser:true}
)
    .then(()=>console.log('MongoDB is connected'))
    .catch( err => console.log(err))

server.use(bodyParser.urlencoded({extended:false}))
server.use(bodyParser.json())

// passport 初始化
server.use(passport.initialize());
require('./config/passport')(passport)

// 路由
const users = require('./router/api/users');
const profiles = require('./router/api/profiles');

server.use('/users',users)
server.use('/profiles',profiles)

server.listen(8002,console.log("Server running on 8002"))
