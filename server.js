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
const blog = require('./schemas/blogSchema');
const comments = require('./schemas/commentsSchema');
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
app.use(passport.session())
passport.use(new localStrategy(credential.authenticate()))

passport.serializeUser(credential.serializeUser())
passport.deserializeUser(credential.deserializeUser())

app.use(async(req,res,next)=>{
    
    res.locals.currentUser = req.user;
    // if(req.user !== undefined){
    //     User = req.user.username;
    // }
    // // console.log(User);
    // const testblog = new blog({username:'nishanth', blogMessage:'hello every one this is the test blog'})
    //  await testblog.save();   
    // blog.findAndDelete({})
    next();
})


//routes for server
app.get('/signup',(req,res) =>{
    res.render('./signup.ejs')
})

app.get('/index',async(req,res) =>{
    const blogs = await blog.find({})
    res.render('./index.ejs',{blogs})
})

app.get('/index/:id',async(req,res) =>{
    const blogv = await blog.findById(req.params.id);
    res.render('./blog_view.ejs',{blogv})

})

app.get('')

app.post('/register',async(req,res)=>{
    const newUser = new credential(req.body.user)
    const registeredUser = await credential.register(newUser,req.body.password)
    res.redirect('/');
})
app.post('/authenticate',passport.authenticate('local',{failureRedirect:'/'}),(req,res)=>{
//   console.log(req.user)
  res.redirect('/index')
})

app.get('/profile/:username',async(req,res)=>{
    const profile = await credential.findOne({username:req.params.username})
    res.render('./profile.ejs',{profile})

})

app.get('/logout',(req,res) =>{
    req.logout(()=>{
    res.redirect('/')
    })
}) 

app.get('/', async(req,res) =>{
    
     res.render('./login.ejs')
})


// setting mac port for server communication
app.listen(3000,() =>{
    console.log('connection set')
})