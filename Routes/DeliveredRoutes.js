const express = require('express')
const router= express.Router()


const DeliveredController =require('../Controller/DeliveredController')
 router.post('/store', DeliveredController.store)
 router.get('/', DeliveredController.index)
 router.post('/delete', DeliveredController.destroy)
 router.post('/show', DeliveredController.show)
 module.exports = router
