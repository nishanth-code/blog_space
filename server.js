// importing files and packages
const express = require('express');
const  mongoose  = require('mongoose');
const app = express();
const Joi = require('joi')
const ejsMate = require('ejs-mate')
const methodOverride = require('method-override')
const path = require('path')
const passport = require('passport')

// connection to database (mongo)

mongoose.connect('mongodb+srv://nishanth:nish1234@cluster0.bbodeek.mongodb.net/blogSpace',{
useNewUrlParser: true,
useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error',console.error.bind('connection error:'))
db.once("open",() => {
    console.log("db connected")
});

// prerequisite settings

app.set('view engine','ejs')
app.engine('ejs',ejsMate)
app.set('views',path.join(__dirname,'views'))
app.use(express.urlencoded({ extended : true }))
app.use(methodOverride('_method'))
mongoose.set('strictQuery', true);

//routes for server

app.get('/',(req,res) =>{
    res.send('sucess rex')
})


// setting mac port for server communication
app.listen(3000,() =>{
    console.log('connection set')
})