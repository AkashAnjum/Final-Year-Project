const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AdminSchema = new Schema({
    
    title:{
            type:String
        },
        image:{
            type:String
        },
        sub:[{  
                subtitle:{
                  type:String
                },
                size:{
                    type:String
                },
                price:{
                    type:Number
                },
                subImage:{
                    type:String
                }
            }]},{timestamps: true})
 const Admin = mongoose.model('Admin',AdminSchema)
 module.exports = Admin