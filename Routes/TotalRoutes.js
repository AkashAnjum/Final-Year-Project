const express = require('express')
const router= express.Router()


const TotalController =require('../Controller/TotalController')
 router.post('/store', TotalController.store)
 router.get('/', TotalController.index)
 router.post('/delete', TotalController.destroy)
 module.exports = router
