const mongoose = require('../utils/db')

let Schema = mongoose.Schema
let userSchema = new Schema({
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('User',userSchema)