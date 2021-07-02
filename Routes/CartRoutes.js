const express = require('express')
const router= express.Router()


const CartController =require('../Controller/CartController')
 router.post('/store', CartController.store)
 router.get('/index', CartController.index)
 router.post('/destroy', CartController.destroy)
 router.post('/show',CartController.show)
 router.post('/delete',CartController.deleteData)
 module.exports = router
