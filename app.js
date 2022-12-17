const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const session = require('express-session');

const pageRoute = require('./routes/pageRoute');
const courseRoute = require('./routes/courseRoute');
const categoryRoute = require('./routes/categoryRoute');
const userRoute = require('./routes/userRoute');
const app = express();
const port = 3000;


mongoose.connect('mongodb://localhost/smartedu-db',{
    useNewUrlParser:true,
    useUnifiedTopology: true,
});


app.set("view engine" , "ejs");

global.userIN = null;
//Middlewares



app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static("public"));
app.use(
    session({
      secret: 'my_keyboard_cat', // Buradaki texti değiştireceğiz.
      resave: false,
      saveUninitialized: true,
      
     
    })
  );

  app.use('*',(req,res,next)=>{
    userIN = req.session.user;
    next();
  }); 

//Routes
   
app.use('/', pageRoute);
app.use('/courses', courseRoute);
app.use('/categories', categoryRoute);
app.use('/users', userRoute);



app.listen(port , ()=> {
    console.log('sunucu %d portunda aktif',port);
});