const Delivered = require('../Models/DeliveredModels')
const store =async(req, res, next) => { 
      
    let delivered = new Delivered({
    name: req.body.name,
    number: req.body.number,
    userId:req.body.userId,
    sub:req.body.sub,
    address:req.body.address,
    subtotal:req.body.subtotal,
    charges:req.body.charges,
    total:req.body.total,
      
  })
  delivered.save()
      .then(response => {
          res.json({
              message: 'Category Added Successfully',
              data: Delivered
          })
      })
      .catch(error => {
          res.json({
              message: 'An error occured!'
          })
      })   
}  

const index = (req, res, next) => {
     Delivered.find()
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
      console.log("12345678")
}

// for single user
const show = async(req, res, next) => {  
    let dates = new Array();
    const response = await Delivered.find()
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
    console.log(req.body._id)
    Delivered.findByIdAndRemove(req.body._id)
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