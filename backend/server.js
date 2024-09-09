import morgan from 'morgan'
import helmet from 'helmet'
/* import passport from 'passport'
import GoogleStrategy from './config/passport.config.js' 
import authorization from './middleware/authorization.js'; */
import cors from 'cors'
import express from 'express'
import 'dotenv/config'
import mongoDbConnection from './db.js'
import authRouter from './routes/authentication.router.js'
import profileRoutes from './routes/profileRoutes.js'

const port = process.env.PORT || 5000
const host = process.env.HOST || 'http://localhost:5000/'
const server = express()

server.use(express.json())
server.use(cors()) 
server.use(morgan("dev")) 
server.use(helmet())

// routers
server.use('/auth', authRouter)
server.use('/profile', profileRoutes)


mongoDbConnection()


server.listen(port, () => {
    console.log(`Server is listening at port ${port} at ${host}`)
})