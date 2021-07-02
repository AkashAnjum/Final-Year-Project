const express = require('express')
const router= express.Router()


const RejectedController =require('../Controller/RejectedController')
 router.post('/store', RejectedController.store)
 router.get('/', RejectedController.index)
 router.post('/delete', RejectedController.destroy)
 router.post('/show', RejectedController.show)
 module.exports = router
