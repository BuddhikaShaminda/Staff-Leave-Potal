const express = require('express');
const mongoose = require('mongoose');
const bodyPaser = require('body-parser');
const passport = require('passport');

const user = require('./routs/api/user');
const profile = require('./routs/api/profile');
const admin = require('./routs/api/admin');

const app = express();

//setup body parser middleware
app.use(bodyPaser.urlencoded({extended : false}));
app.use(bodyPaser.json());

//db configuration
const db = require('./config/keys').mongoURI;

//db connection
mongoose
    .connect(db)
    .then(()=>console.log('MongoDB Connected'))
    .catch(err=>console.log(err));


//passport middleware
app.use(passport.initialize());

require('./config/passport')(passport);

//use routs
app.use('/api/user',user);
app.use('/api/profile',profile);
app.use('/api/admin',admin);

const port = process.env.PORT || 5000;

app.listen(port,()=>console.log('Server is Runing'));