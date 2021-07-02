
//bad
//Akash Commit
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const UserRouter= require('./Routes/UserRoutes')
const AdminRouter=require('./Routes/AdminRoutes')
const CartRouter=require('./Routes/CartRoutes')
const OrderRouter=require('./Routes/OrderRoutes')
const TotalRouter=require('./Routes/TotalRoutes')
const DeliveredRouter=require('./Routes/DeliveredRoutes')
const RejectedRouter=require('./Routes/RejectedRoutes')
const LoginRouter=require('./Routes/Login')
const path = require('path');
require('dotenv').config()
const mongo_uri = process.env.Mongo_Uri
mongoose.connect(mongo_uri, 
    { useFindAndModify: false,useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error',(err)=>  { 
     console.log(err)
})
db.once('open',()=>{
    console.log('database connection is established')
})

const app = express()
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use((req,res, next)=>{
    res.setHeader('Access-Control-Allow-Origin',"http://localhost:3002/");
    res.setHeader('Access-Control-Allow-Headers',"*");
    res.header('Access-Control-Allow-Credentials', true);
    next();
});




    // user panel ui routing
    
    app.use(express.static(path.join(__dirname+'/university_cafe_fyp/build')));

    // routes
    app.get("/",(req,res)=>{
        res.sendFile(path.join(__dirname,'/university_cafe_fyp/build/index.html'));
    })
    app.get("/ordernow",(req,res)=>{
        res.sendFile(path.join(__dirname+'/university_cafe_fyp/build/index.html'));
    })
    app.get("/login",(req,res)=>{
        res.sendFile(path.join(__dirname+'/university_cafe_fyp/build/index.html'));
    })
    app.get("/signup",(req,res)=>{
        res.sendFile(path.join(__dirname+'/university_cafe_fyp/build/index.html'));
    })
    app.get("/profile",(req,res)=>{
        res.sendFile(path.join(__dirname+'/university_cafe_fyp/build/index.html'));
    })
    app.get("/cart",(req,res)=>{
        res.sendFile(path.join(__dirname+'/university_cafe_fyp/build/index.html'));
    })
    app.get("/about",(req,res)=>{
        res.sendFile(path.join(__dirname+'/university_cafe_fyp/build/index.html'));
    })
    app.get("/contact",(req,res)=>{
        res.sendFile(path.join(__dirname+'/university_cafe_fyp/build/index.html'));
    })
    app.get("/active/:id",(req,res)=>{
        res.sendFile(path.join(__dirname+'/university_cafe_fyp/build/index.html'));
    })
    
    app.get("/track",(req,res)=>{
        res.sendFile(path.join(__dirname+'/university_cafe_fyp/build/index.html'));
    })
    app.get("/uipending",(req,res)=>{
        res.sendFile(path.join(__dirname+'/university_cafe_fyp/build/index.html'));
    })
    app.get("/uidelivered",(req,res)=>{
        res.sendFile(path.join(__dirname+'/university_cafe_fyp/build/index.html'));
    })
    app.get("/uirejected",(req,res)=>{
        res.sendFile(path.join(__dirname+'/university_cafe_fyp/build/index.html'));
    })





    // admin panel ui routing
    app.use(express.static(path.join(__dirname+'/AdminPanel/build')));
    app.get("/adminpanel",(req,res)=>{
        res.sendFile(path.join(__dirname+'/AdminPanel/build/index.html'));
    })
    app.get("/loginadmin",(req,res)=>{
        res.sendFile(path.join(__dirname+'/AdminPanel/build/index.html'));
    })
    app.get("/viewcategory",(req,res)=>{
        res.sendFile(path.join(__dirname+'/AdminPanel/build/index.html'));
    })
    app.get("/addcategory",(req,res)=>{
        res.sendFile(path.join(__dirname+'/AdminPanel/build/index.html'));
    })
    app.get("/viewitem",(req,res)=>{
        res.sendFile(path.join(__dirname+'/AdminPanel/build/index.html'));
    })
    app.get("/additem",(req,res)=>{
        res.sendFile(path.join(__dirname+'/AdminPanel/build/index.html'));
    })
    app.get("/total",(req,res)=>{
        res.sendFile(path.join(__dirname+'/AdminPanel/build/index.html'));
    })
    app.get("/pending",(req,res)=>{
        res.sendFile(path.join(__dirname+'/AdminPanel/build/index.html'));
    })
    app.get("/delivered",(req,res)=>{
        res.sendFile(path.join(__dirname+'/AdminPanel/build/index.html'));
    })
    app.get("/rejected",(req,res)=>{
        res.sendFile(path.join(__dirname+'/AdminPanel/build/index.html'));
    })
    app.get("/order",(req,res)=>{
        res.sendFile(path.join(__dirname+'/AdminPanel/build/index.html'));
    })




const PORT =process.env.PORT||3002

app.listen(PORT, ()=> {
    console.log(`server is runing on port ${PORT}`)
})
// api routes
 app.use('/api/user',UserRouter) 
 app.use('/api/admin',AdminRouter) 
 app.use('/api/cart',CartRouter)
 app.use('/api/order',OrderRouter)
 app.use('/api/total',TotalRouter)
 app.use('/api/delivered',DeliveredRouter)
 app.use('/api/rejected',RejectedRouter)
 app.use('/api/adminpanel',LoginRouter)
