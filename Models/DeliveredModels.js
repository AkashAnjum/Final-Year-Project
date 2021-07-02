const mongoose = require('mongoose')
const schema = mongoose.Schema
const DeliveredSchema = new mongoose.Schema(
    {
    name:{
        type:String
    },
    number:{
         type:String
    },
    userId:{
        type:String
   },
    sub:[{
        item_id:{
           type:String
        },
        subtitle:{
           type:String
        },
        size: {
            type:String
        },
        quantity:{
            type: Number
         },
         itemprice:{
            type:Number
        }  
    }
    ],
    address:{
       type:String
    },
    subtotal:{
        type:Number
    },
    charges:{
        type:Number
    },
    total:{
        type:Number
    } 
},{timestamps: true})
 const Delivered = mongoose.model('delivered',DeliveredSchema)
 module.exports = Delivered