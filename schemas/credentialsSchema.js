const mongoose = require('mongoose')
const schema = mongoose.Schema;
const blog = require('./blogSchema')
const passportLocalMongoose = require('passport-local-mongoose')

const credentialScema = new schema({
    email:String,
    
    blogs:[
        {type: schema.Types.ObjectId, ref: 'blog'}
    ],
    
})
credentialScema.plugin(passportLocalMongoose)
module.exports = mongoose.model('credential',credentialScema)