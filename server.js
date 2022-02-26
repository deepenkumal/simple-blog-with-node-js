const express = require('express');
const route = require('./routes/router');
const mongoose = require('mongoose');
const methodOverride = require('method-override')

const app = express();

//set view engine
app.set('view engine','ejs');

//database
mongoose.connect("mongodb://localhost:27017/blogsDB");

//body-parser
app.use(express.urlencoded({extended:false}));

//methodOverride
app.use(methodOverride('_method'));


app.use('/',route);
app.listen(3000,'localhost',()=>{
    console.log(`server started at localhost http://localhost:3000`)
})