// importing files and packages
const express = require('express');
const  mongoose  = require('mongoose');
const app = express();
const Joi = require('joi')
const ejsMate = require('ejs-mate')
const methodOverride = require('method-override')
const path = require('path')

// connection to database (mongo)

// mongoose.connect('mongodb://localhost:27017/yelp',{
// useNewUrlParser: true,
// useUnifiedTopology: true
// });
// const db = mongoose.connection;
// db.on('error',console.error.bind('connection error:'))
// db.once("open",() => {
//     console.log("db connected")
// });

// prerequisite settings

app.set('view engine','ejs')
app.engine('ejs',ejsMate)
app.set('views',path.join(__dirname,'views'))
app.use(express.urlencoded({ extended : true }))
app.use(methodOverride('_method'))



app.listen(3000,() =>{
    console.log('connection set')
})