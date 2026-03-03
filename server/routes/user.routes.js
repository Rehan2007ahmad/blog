const express = require('express');
const router = express.Router();
const { createUser,loginUser , getUser, getAllUsers, deleteUser, updateUser, sendOtp, verifyOtp, changePassword} = require('../controllers/user.controller');
const {authenticateToken} = require('../middleware/auth.middleware')

router.get('/', getAllUsers);

router.post('/register', createUser);
router.post('/login', loginUser);

router.post('/send-otp', sendOtp); 
router.post('/verify-otp', verifyOtp);
router.post('/change-password', changePassword);


router.get('/:id', getUser);
router.delete('/:id', deleteUser);
router.put('/:id', updateUser);
module.exports = router;
