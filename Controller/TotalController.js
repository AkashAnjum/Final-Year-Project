const Total = require('../Models/TotalModels')
const store =async(req, res, next) => { 
      
    let total = new Total({
    name: req.body.name,
    number: req.body.number,
    userId:req.body.userId,
    sub:req.body.sub,
    address:req.body.address,
    subtotal:req.body.subtotal,
    charges:req.body.charges,
    total:req.body.total,
      
  })
  total.save()
      .then(response => {
          res.json({
              message: 'Category Added Successfully',
              data: Total
          })
      })
      .catch(error => {
          res.json({
              message: 'An error occured!'
          })
      })   
}  

const index = (req, res, next) => {
     Total.find()
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

// for delete
const destroy= (req, res,next)=>{
    console.log(req.body._id)
    Total.findByIdAndRemove(req.body._id)
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
  store,index,destroy
}