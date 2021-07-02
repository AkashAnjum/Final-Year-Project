const express = require('express')
const router= express.Router()
const OrderController =require('../Controller/OrderController')
 router.post('/store', OrderController.store)
 router.get('/', OrderController.index)
 router.post('/delete', OrderController.destroy)
 router.post('/show', OrderController.show)
 module.exports = router
