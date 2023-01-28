const { date } = require('joi');
const mongoose = require('mongoose')
const comments = require('./commentsSchema')
const schema = mongoose.Schema;
const blogScema = new schema({
    
    blogMessage:String,
    comments:[
        {
            type:schema.Types.ObjectId , ref:'comments'
        }
    ]
    
})
module.exports = mongoose.model('blog',blogScema)