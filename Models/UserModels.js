const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
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
 const User = mongoose.model('User',UserSchema)
 module.exports = User





 /*const CatSchema=new Schema(
     {
         categoryTitle:"Pizza",
         imgUrl:"dfkasjl",
         subCategory:[
            {
                title:"chicken fajita",
                imgUrl:".png",
                price:"",
                size:"",
                descripiton:"",
            },
            {
                title:"Hot and spicy fajita",
                imgUrl:".png",
                price:"",
                size:"",
                descripiton:"",
            }
         ]

         
     },
     {
        categoryTitle:"Burger",
        imgUrl:"dfkasjl",
        subCategory:[
           {
               title:"chiken burger fajita",
               imgUrl:".png",
               price:"",
               size:"",
               descripiton:"",
           },
           {
               title:"Hot and spicy fajita",
               imgUrl:".png",
               price:"",
               size:"",
               descripiton:"",
           }
        ]

        
    },
) */