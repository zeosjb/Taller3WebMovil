const express = require('express');
const router = express.Router();
const { loginUser, registerUser, editProfile, updatePassword } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// Rutas sin protección
router.post('/login', loginUser);
router.post('/register', registerUser);

// Rutas protegidas con el middleware protect
router.put('/editprofile/:id', protect, editProfile);
router.put('/resetpassword/:id', protect, updatePassword);

module.exports = router;
