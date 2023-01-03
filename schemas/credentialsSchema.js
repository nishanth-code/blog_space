const mongoose = require('mongoose')
const schema = mongoose.Schema;a 
const credentialScema = new schema({
    username:String,
    password:String
})
module.exports = mongoose.model('credential',credentialScema)