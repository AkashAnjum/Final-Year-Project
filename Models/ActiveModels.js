const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ActiveUserSchema = new Schema({
    name: {
        type : String
    },
    email:{
        type: String
    },
    department:{
        type: String
    },
    phone_no:{
       type: String
    },
    password:{
        type: String
    }
},{timestamps: true})
 const ActiveUser = mongoose.model('ActiveUser',ActiveUserSchema)
 module.exports = ActiveUser