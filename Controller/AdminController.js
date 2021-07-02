const jwt = require('jsonwebtoken')

const Admin = require('../Models/AdminModels');
const ActiveUser = require('../Models/ActiveModels');


const cloudinary = require('../utils/cloudinary');

//fetch data

const isAuth = (req, res, next) => {

    const token = req.headers.authorization;
    
        if (token) {
            console.log(token)
            const onlyToken = token.slice(7, token.length);
            console.log(onlyToken)
            jwt.verify(onlyToken,'verySecret' ,async (err, decode) => {
              if (err) {
                console.log("invalid")
                return res.status(401).send({ message: 'Invalid Token' });
              }
              console.log(onlyToken)
              req.user = decode;
              next();
              return;
            })
          } else {
              console.log("not found")
            return res.status(401).send({ message: 'Token is not supplied.' });
          }
        };


const index = (req, res, next) => {
    Admin.find()
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
// // show single User data
// const show = (req, res, next) => {
//     let userId = req.body.userId
//     User.findById(userId)
//         .then(response => {
//             res.json({
//                 response
//             })
//         })
//         .catch(error => {
//             res.json({
//                 message: 'An error occured!'
//             })
//         })
// }
// // insert data
const store = (req, res, next) => {
    async function finding(req, res, next) {
        // const result = await cloudinary.uploader.upload(req.file.path)
        const cat = await Admin.findOne({ $or: [{ title: req.body.title }] })
    
        if (cat) {
            res.json({ message: "Category already found" })
        }
        else {
            let admin = new Admin({
                title: req.body.title,                
                image: req.body.image
            })
            admin.save()
                .then(response => {
                    res.json({
                        message: 'Category Added Successfully',
                        data: admin
                    })
                })
                .catch(error => {
                    res.json({
                        message: 'An error occured!'
                    })
                })
        }

    }
    finding(req, res, next)


}
// add item
const storeItem =(req, res, next) => {
    async function finding(req, res, next) {
        const cat = await Admin.findOne({ $or: [{ title: req.body.title  }] }) 
        if (cat) {
                let item = {
                    subtitle: req.body.subtitle,
                    size: req.body.size,
                    price: req.body.price,
                    subImage:req.body.subImage
                }
                cat.sub.push(item); 
                cat.save()
                .then(() => {
                    res.json({
                        message: 'Item Added Successfully'
                    })
                })
                .catch(error => {
                    res.json({
                        message: 'An error occured!'
                    })
                })
            }
          else {
            res.json({
                message: 'Category not found'
            })
        }
    }
    finding(req, res, next)

}
// update data
const update =async (req, res, next) => {
    let adminId = req.body._id
    const response=await  Admin.findById(adminId); 
    console.log(response.image);
    let upDate =
    {
        title: req.body.title || response.title,
        image:req.body.image || response.image
    }
    Admin.findByIdAndUpdate(adminId, { $set: upDate })
        .then(() => {
            res.json({
                message: 'Category update successfully'
            })
        })
        .catch(error => {
            res.json({
                message: 'An error occured!'
            })
        })
}
// update data
const updateItem =async (req, res, next) => {
    let Id = req.body._id;
    let Id2= req.body._id2;
    console.log(Id); 
    const response=await  Admin.findById(Id); 
    console.log(response.sub);
    let NewItem=response.sub.map(item=>{
        if(item._id==Id2){
           return{
            subtitle:req.body.subtitle||item.subtitle,
            size:req.body.size||item.size,
            price:req.body.price||item.price,
            subImage:req.body.subImage||item.subImage
        }}
        else{
            return   item    
        }
    })
    res.json({
                    message: 'Items update successfully'
                })
    console.log(NewItem);
    response.sub=NewItem;
   const result= await response.save();
   console.log(result);
    
    // Admin.findByIdAndUpdate(adminId, { $set: upDate })
    //     .then(() => {
    //         res.json({
    //             message: 'Items update successfully'
    //         })
    //     })
    //     .catch(error => {
    //         res.json({
    //             message: 'An error occured!'
    //         })
    //     })
}
// remove data

const destroy= async(req, res,next)=>{
    await Admin.findByIdAndRemove(req.body._id)
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


const destroyItem =async (req, res, next) => {
    const response=await  Admin.findById(req.body._id); 
    let NewItem=response.sub.filter(item=>item._id!=req.body._id2);
    response.sub=NewItem;
    const result=  response.save()
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
// // user login function 
// const login= (req,res,next)=>{
//     var username= req.body.email
//     var password= req.body.password

//     User.findOne({$or: [{email: username}]})

//     .then(User=>{
//         if(User){
//             bcrypt.compare(password,User.password, function(err, result){
//                if(err){
//                    res.json({
//                        error:err
//                    }) 
//                }
//                if(result){
//                    let token= jwt.sign({name: User.name}, 'verySecretvalue',{expiresIn:'1h'})
//                    res.json({
//                        message: "Login successfull!",
//                        token
//                    })
//                }
//                else{
//                    res.json({
//                        message:"password not match" 
//                    })
//                }
//             })

//         }
//         else{
//             res.json({
//                 message:"User not found!"
//             })
//         }
//     })
// }

module.exports = {
    index, store, update, storeItem,updateItem,destroy,destroyItem,isAuth //,show,login
}



