const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');

const pageRoute = require('./routes/pageRoute');
const CourseRoute = require('./routes/courseRoute');
const app = express();
const port = 3000;


mongoose.connect('mongodb://localhost/smartedu-db',{
    useNewUrlParser:true,
    useUnifiedTopology: true,
});


app.set("view engine" , "ejs");

//Middlewares
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static("public"));

//Routes
app.use('/', pageRoute);
app.use('/courses', CourseRoute);



app.listen(port , ()=> {
    console.log('sunucu %d portunda aktif',port);
});