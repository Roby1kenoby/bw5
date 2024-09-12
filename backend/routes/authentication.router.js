import express from 'express'
import passport from 'passport'
import authentcation from '../middlewares/authentication.js'
import { loginUser, getUserData, callbackGoogle } from '../controllers/authentication.controller.js'

const authRouter = express.Router()

authRouter.post('/login', loginUser)

authRouter.get('/me', authentcation, getUserData)

// login google
authRouter.get('/login-google', passport.authenticate('google',{
	scope: ['profile','email']
}))

authRouter.get('/callback-google', passport.authenticate('google',{
	session:false
}), callbackGoogle)

export default authRouter