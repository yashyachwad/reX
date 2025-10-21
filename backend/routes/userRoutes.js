const express = require('express');
const userRouter = express.Router();
const protect = require('../middlewares/authMiddleware');
const {getUserProfile, registerUser, loginUser } = require('../controllers/userController')


// routes 

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
// protected route ,as token wil be required . ( middleware used : protect )ginUser } 
userRouter.get('/profile', protect, getUserProfile)


module.exports = userRouter;