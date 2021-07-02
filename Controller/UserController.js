const User = require('../Models/UserModels')
const ActiveUser = require('../Models/ActiveModels')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer');
const {google} = require('googleapis');
const CLIENT_ID='160497000816-poic2qdl8o0c6hnnd6lth4d6hrkssrea.apps.googleusercontent.com';
const CLIENT_SECRET='MAFgUjVg_qS-4jSChTxX9Hug';
const REDIRECT_URL='https://developers.google.com/oauthplayground';
const REFRESH_TOKEN='1//040iza18J5097CgYIARAAGAQSNgF-L9IrF-roQPhqjeV02SmW8-omoiSD-HGs7DqKtxUegRihNjSeDmJNe2KMIJBPzzlL7qGEQw';

const oAuth2Client=new google.auth.OAuth2(CLIENT_ID,CLIENT_SECRET,REDIRECT_URL)
oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN})
//fetch data
const index = (req, res, next) => {
    ActiveUser.find()
        .then(response => {
            res.json({
                response
                
            })
        })
        .catch(error => {
            res.json({
                message: 'An error occured!'
            })
        })
}
// show single User data
const show = (req, res, next) => {
    let userId = req.body.userId
    ActiveUser.findById(userId)
        .then(response => {
            res.json({
                message: response
            })
        })
        .catch(error => {
            res.json({
                message: 'An error occured!'
            })
        })
}


//active user
const active= async (req, res) => {
    const _id  = req.body._id;
    console.log(_id)
   
      const user = await    User.findById(_id)
      console.log(user)
    //   .then(User=>{
    //     console.log(User)
    //   })
  
      if(user){
        const puser = await ActiveUser.findOne({ $or: [{ email: user.email }] })
        console.log(puser)
        if(puser){
            res.json({message: "Email Already registered"}) 
       
    }
    else{
        let newUser = new ActiveUser({
            name: user.name,
            email: user.email,
            department: user.department,
            phone_no: user.phone_no,
            password: user.password,
        })
        // const newUser =await new ActiveUser({user});
        await newUser.save();
        await user.remove();
        res.json({message: "Email has been registered"})
    }
      }
      else{
        res.json({message: "Email Already registered"})
 
      }
    
}
// insert data
const store =async (req, res, next) => {
    bcrypt.hash(req.body.password,10,async function(err,hashedpass){
        if(err){
            res.json({ error: err})
        }else{
            console.log(hashedpass)
            const puser = await ActiveUser.findOne({ $or: [{ email: req.body.email }] })
            if(puser){
                res.json({
                    message: 'Email Already Registered',
                })
            }
            else{
            let user = new User({
                name: req.body.name,
                email: req.body.email,
                department: req.body.department,
                phone_no: req.body.phone_no,
                password: hashedpass,
            })
            let id=user._id
            console.log(user)
            const message = {
                from: 'akashanjum282@gmail.com',
                // to: toUser.email // in production uncomment this
                to: user.email,
                subject: 'Your App - Activate Account',
                html: `
                  <h3> Hello ${user.name}</h3>
                  <p>Thank you for registering in University Cafe. Much Appreciated! Just one last step is laying ahead of you...</p>
                  <p>To activate your account please follow this link: <a target="_" href="http://localhost:3000/active/${id}"> Click for activation</a></p>
                  <p>Your Application Team</p>
                `
              }
            
           
             user.save()
             sendEmail(message)
                .then(response => {
                    res.json({
                        message: 'Go to your Gmail for verification',
                        data: user
                    })
                })
                .catch(error => {
                    res.json({
                        message: 'An error occured!'
                    })
                })
        }}

    })
    
}



async function sendEmail(message) {
    const accessToken=await oAuth2Client.getAccessToken()
    return new Promise((res, rej) => {
     
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
        type:'OAuth2',
          user: 'akashanjum282@gmail.com',
          clientId:CLIENT_ID,
          clientSecret:CLIENT_SECRET,
          refreshToken:REFRESH_TOKEN,
          accessToken:accessToken
        }
      })
  
      transporter.sendMail(message, function(err, info) {
        if (err) {
          rej(err)
          console.log(err)
        } else {
          res(info)
          console.log(info)
        }
      })
    })
  }
// update data
const update = (req, res, next) => {
    let userId = req.body.userId;  
    let upDate={   
        name: req.body.name,
        department: req.body.department,
        phone_no: req.body.phone_no,
        password: req.body.password,
    }
    User.findByIdAndUpdate(userId, {$set: upDate})
        .then(() => {
            res.json({
                message: 'Data update successfully'
            })
        })
        .catch(error => {
            res.json({
                message: 'An error occured!'
            })
        })
}
// remove data

const destroy= (req, res,next)=>{
    let userId= req.body.userId
    User.findOneAndRemove(userId)
    .then(()=>{
        res.json({
            message: 'data is deleted!'
        })
    })
    .catch(error=>{
        res.json({
           message: 'An error occured!' 
        })
    })
}


// user login function 
const login= (req,res,next)=>{
    var username= req.body.email
    var password= req.body.password
    ActiveUser.findOne({$or: [{email: username}]})
    .then(ActiveUser=>{
        if(ActiveUser){
            bcrypt.compare(password,ActiveUser.password, function(err, result){
               if(err){
                   res.json({
                       error:err
                   }) 
               }
               if(result){
                   let token= jwt.sign({name: ActiveUser.name}, 'verySecret',{expiresIn:'1h'})
                   res.json({
                       message: "Login successfull!",
                       token,
                       messagex: (ActiveUser._id),
                       
                   })
               }
               else{
                   res.json({
                       message:"password not match!" 
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

module.exports={
    index,store,update,destroy,show,login,active
}