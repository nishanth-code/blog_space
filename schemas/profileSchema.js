const { string } = require('joi');
const mongoose = require('mongoose')
const schema = mongoose.Schema;
 
const profileScema = new schema({
    profilePicture: String,
    userName: String,
    gitURL: String,
    linkedInURL: String,
    credentials:{},
    blogs:[
        {}
    ],

})
module.exports = mongoose.model('profile',profileScema)