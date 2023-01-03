const mongoose = require('mongoose')
const schema = mongoose.Schema;
const commentsScema = new schema({
    username:String,
    comment:String
})
module.exports = mongoose.model('comments',commentsScema)