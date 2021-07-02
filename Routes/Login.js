const mongoose = require('mongoose')
const Schema = mongoose.Schema
const jwt = require('jsonwebtoken')
const AdminUserSchema = new Schema({
    email:{
        type: String
    },
    password:{
        type: String
    }
},{timestamps: true})
 const AdminUser = mongoose.model('AdminUser',AdminUserSchema)
   

 const store = (req, res, next) => {
            let user = new AdminUser({
                email: req.body.email,
                password: req.body.password,
            })
            console.log(user)
            user.save()
                .then(response => {
                    res.json({
                        message: 'Register successfully',
                        data: user
                    })
                })
                .catch(error => {
                    res.json({
                        message: 'An error occured!'
                    })
                })

        }


const login= (req,res,next)=>{
    var Email= req.body.email
    var Password= req.body.password
    
    AdminUser.findOne({$or: [{email: Email}]})
    .then(User=>{
        if(User){
            AdminUser.findOne({$or: [{password: Password}]})
                  .then(result=>{
                    if(result){
    
                   let token= jwt.sign({name: AdminUser.name},'verySecret',{expiresIn:'1h'})
                   res.json({
                       message: "Login successfull!",
                       token
                   })
               }
               else{
                   res.json({
                       message:"password not match" 
                   })
               }
            })
        }
        else{
            res.json({
                message:"User not found!"
            })
        }
    })
}

const express = require('express')
const router= express.Router()
 router.post('/store', store)
 router.post('/login', login)
 module.exports = router
  