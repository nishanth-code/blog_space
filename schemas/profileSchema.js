const { string } = require('joi');
const blog = require('blogSchema')
const credential = require('credentialsSchema')
const mongoose = require('mongoose')
const schema = mongoose.Schema;
 
const profileScema = new schema({
    profilePicture: String,
    userName: String,
    gitURL: String,
    linkedInURL: String,
    credentials:{ type:schema.Types.ObjectId , ref:'credential'},
    blogs:[
        {type: schema.Types.ObjectId, ref: 'blog'}
    ],

})
module.exports = mongoose.model('profile',profileScema)