import express from 'express'
const router = express.Router()
import authenticateUser from '../middleware/auth.js'
import testUser from '../middleware/testUser.js'
import {
  login,
  register,
  updateUser,
  getCurrentUser,
  logout
} from '../controllers/authController.js'
import rateLimiter from 'express-rate-limit'

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 10,
  message: 'Too many request from this IP, please try again after 15 minutes'
})

router.route('/register').post(apiLimiter, register)
router.route('/login').post(apiLimiter, login)
router.route('/logout').get(logout)
router.route('/updateUser').patch(authenticateUser, testUser, updateUser)
router
  .route('/getCurrentUser')
  .get(authenticateUser, getCurrentUser, updateUser)

export default router
