const Rejected = require('../Models/RejectedModels')
const store =async(req, res, next) => { 
      
    let rejected = new Rejected({
    name: req.body.name,
    number: req.body.number,
    userId:req.body.userId,
    sub:req.body.sub,
    address:req.body.address,
    subtotal:req.body.subtotal,
    charges:req.body.charges,
    total:req.body.total,
      
  })
  rejected.save()
      .then(response => {
          res.json({
              message: 'Category Added Successfully',
              data: Rejected
          })
      })
      .catch(error => {
          res.json({
              message: 'An error occured!'
          })
      })   
}  

const index = (req, res, next) => {
     Rejected.find()
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
    const response = await Rejected.find()
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
    Rejected.findByIdAndRemove(req.body._id)
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