const express = require('express')
const router = express.Router()

const { registerUser, loginUser, editProfile, updatePassword } = require('../controllers/userController')

router.post('/login', loginUser)
router.post('/register', registerUser)
router.put('/editprofile/:id', editProfile)
router.put('/resetpassword/:id', updatePassword)

module.exports = router