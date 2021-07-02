const Cart = require('../Models/CartModels')
const Admin=require('../Models/AdminModels')
const ActiveUser=require('../Models/ActiveModels');
const { response } = require('express');
const store =async(req, res, next) => { 
 
    const Userdata= await ActiveUser.findOne({_id:req.body.user_id});  
    if (Userdata){
        const Admindata= await Admin.findOne({_id:req.body.category_id});
        if(Admindata){
        let MYData=await Admindata.sub.filter(item => item._id == req.body.item_id);
        if(MYData[0]){
        let object=MYData[0]
        console.log(object)
        let Price=object.price;
        let Quant=req.body.quantity;
        let Subtitle = object.subtitle;
        let Size = object.size;
        let ItemPrice=Price*Quant;
        let cart = new Cart({
          user_id:Userdata,
          category_id:Admindata,
          item_id:req.body.item_id,
          subtitle:Subtitle,
          size:Size,
          quantity: Quant,
          itemprice:ItemPrice,
          })
          cart.save()
          .then(response => {
              res.json({
                  message: "data saved...",
                  response
              })
          } )
          .catch(error => {
              res.json({
                  message: 'An error occured!'
                  
              })
          })
        }
        else{
            res.json({
              message: 'Item not found',
          })
        }
        }else{
            res.json({
              message: 'Category not found',
          })
            
        }
         
      }  
      else{
        res.json({
          message: 'Login First for Place Order',
      })
      }
    }
    
    
const show = async(req, res, next) => { 
    console.log(req.body.user_id) 
    let dates = new Array();
    const response = await Cart.find()
        response.map((item,a)=>{
            if(item.user_id==req.body.user_id){
                dates.push(response[a]);
        }
      
        })
        console.log(dates)
    console.log( 'data')
    res.json({
       dates
    })

}
const deleteData = async(req, res, next) => {  
   
    let response = await Cart.find()
    response.map((item,a)=>{
        if(item.user_id==req.body.user_id){
            let card_id=response[a]._id
          Cart.findByIdAndRemove(card_id)
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
    res.json({
        message: 'All data delete' 
     })
    })
  
    // console.log(response)
    // const NewItem=response.filter(item=>item.user_id!=req.body.user_id);
    // response=NewItem;
    // console.log(response)
    // const result=await  response.save()
    // .then(()=>{
    //     res.json({
    //         message: 'data is deleted!'
    //     })
    // })
    // .catch(error=>{
    //     res.json({
    //        message: 'An error occured!' 
    //     })
    // })
    
    res.json({
        message: 'data delete'
    })

}


const index = async(req, res, next) => {  
    const data = await Cart.find()
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
        console.log( 'data')
}

const destroy= (req, res,next)=>{
    let card_id= req.body.id
    Cart.findByIdAndRemove(card_id)
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
module.exports={
  store,index,destroy,show,deleteData
}