const mongoose = require('mongoose')
const schema = mongoose.Schema;
const blogScema = new schema({
    blogMessage:String,
    comments:[
        {
            
        }
    ]
    
})
module.exports = mongoose.model('blog',blogScema)