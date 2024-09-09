import express from 'express'
import passport from 'passport'
import authentcation from '../middlewares/authentication.js'
import { loginUser, getUserData } from '../controllers/authentication.controller.js'

const authRouter = express.Router()

authRouter.post('/login', loginUser)

authRouter.get('/me', authentcation, getUserData)

export default authRouter