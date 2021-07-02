const mongoose = require('mongoose')
const schema = mongoose.Schema
const CartSchema = new mongoose.Schema({
    user_id:{
        type:schema.Types.ObjectId,
        ref:"User"
    },
    category_id:{
        type:schema.Types.ObjectId,
        ref:"Admin"
    },
    item_id:{
        type:String
    },
    subtitle:{
        type:String
    },
    size:{
        type:String
    },
    quantity:{
       type: Number
    },
    itemprice:{
        type:Number
    }
},{timestamps: true})
 const Cart = mongoose.model('Cart',CartSchema)
 module.exports = Cart
