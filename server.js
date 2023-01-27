// importing files and packages
const express = require('express');
const  mongoose  = require('mongoose');
const app = express();
const Joi = require('joi')
const ejsMate = require('ejs-mate')
const methodOverride = require('method-override')
const path = require('path')
const passport = require('passport')
const localStrategy = require('passport-local')
const session = require('express-session')
const credential = require('./schemas/credentialsSchema');
const { Cookie } = require('express-session');

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
const sessionDetails = {
    secret: 'userCredentials',
    resave: false,
    saveUninitialized: true,
    cookie:{
        httpOnly: true,
        expires: Date.now() + (1000*60*60*24),
        maxAge: 1000*60*60*24
    }
}

// prerequisite settings

app.set('view engine','ejs')
app.engine('ejs',ejsMate)
app.set('views',path.join(__dirname,'views'))
app.use(express.urlencoded({ extended : true }))
app.use(methodOverride('_method'))
app.use(session(sessionDetails))
mongoose.set('strictQuery', true);

app.use(passport.initialize())
// app.use(passport.session())
passport.use(new localStrategy(credential.authenticate()))

passport.serializeUser(credential.serializeUser())
passport.deserializeUser(credential.deserializeUser())




//routes for server
app.get('/signup',(req,res) =>{
    res.render('./signup.ejs')
})

app.get('/index',(req,res) =>{
    res.render('./index.ejs')
})

app.post('/register',(req,res)=>{
    res.render('.')
})
app.post('/authenticate',passport.authenticate('local',{failureRedirect:'/'}),(req,res)=>{
  res.redirect('/index')
})

app.get('/logout',(req,res) =>{
    req.logout(()=>{
    res.redirect('/index')
    })
}) 

app.get('/', async(req,res) =>{
    //  const user = new credential({username:'nishanth2'})
    //  const registerdUser = await credential.register(user,'nish@9741')
    //  await registerdUser.save()
    //  res.send(registerdUser)
    const users = await credential.find()
    console.log(users)
    // res.send('sucess')
    res.render('./login.ejs')
})


// setting mac port for server communication
app.listen(3000,() =>{
    console.log('connection set')
})