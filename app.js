const express = require('express');

const app = express();

const port = 3000;
//app.set("view engine" , "html");

app.get('/' , (req,res)=> {
    res.send();
});

app.listen(port , ()=> {
    console.log('sunucu %d portunda aktif',port);
});