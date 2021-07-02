const Order = require('../Models/OrderModels')

   
const store =async(req, res, next) => {  
      
    let order = new Order({
      name: req.body.name,
      number: req.body.number,
      userId:req.body.userId,
      sub:req.body.sub,
      address:req.body.address,
      subtotal:req.body.subtotal,
      charges:req.body.charges,
      total:req.body.total, 
  })
  order.save()
      .then(response => {
          res.json({
              message: 'Order  Added Successfully',
              data: order
          })
      })
      .catch(error => {
          res.json({
              message: 'An error occured!'
          })
      }) 
  
       
}  
const index = (req, res, next) => {
  Order.find()
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

// for single user
const show = async(req, res, next) => {  
    let dates = new Array();
    const response = await Order.find()
        response.map((item,a)=>{
            if(item.userId==req.body.userId){
                dates.push(response[a]);
        }
      
        })
        console.log(dates)
    console.log( 'data')
    res.json({
       dates
    })

}

// for delete

const destroy= (req, res,next)=>{
    console.log(req.body.IDD)
    Order.findByIdAndRemove(req.body.IDD)
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
module.exports= {
  store,index,destroy,show
}