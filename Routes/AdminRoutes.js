const express = require('express')
const router= express.Router()
const upload = require('../utils/multer');

const AdminController =require('../Controller/AdminController')
 router.get('/', AdminController.index)
 router.post('/store',AdminController.store)
 router.post('/storeitem', AdminController.storeItem)
 router.post('/update', AdminController.update)
 router.post('/updateitem', AdminController.updateItem)
 router.post('/delete', AdminController.destroy)
 router.post('/deleteitem', AdminController.destroyItem)
//  router.post('/login', UserController.login)
 module.exports = router
