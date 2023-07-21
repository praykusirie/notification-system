const express = require('express')
const router = express.Router()
const { signUp, signIn, logout, getUser, getStudent, sendMessage, deleteStudent, addNewStudent, getDeliveryReport } = require('../controllers/auth.controllers')
const protect = require('../middleware/authMiddleware')


router.post('/admin/signup', signUp)
router.post('/admin/signin', signIn)
router.post('/admin/logout', logout)
router.get('/admin/getuser', protect, getUser)
router.get('/admin/getstudent', getStudent)
router.get('/admin/getdelivered', getDeliveryReport)
router.post('/admin/sendmessage', sendMessage)
router.post('/admin/addstudent', addNewStudent)
router.post('/admin/deletestudent', deleteStudent)



module.exports = router


