const express = require('express')
const router= express.Router()


const UserController =require('../Controller/UserController')
 router.get('/', UserController.index)
 router.post('/show', UserController.show)
 router.post('/store', UserController.store)
 router.post('/update', UserController.update)
 router.post('/delete', UserController.destroy)
 router.post('/login', UserController.login)
 router.post('/active',UserController.active)
 module.exports = router
