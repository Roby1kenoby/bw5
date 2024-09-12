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
import experiencesRoutes from './routes/experiencesRoutes.js'

import passport from 'passport'
import googleStrategy from './configs/passport.config.js'

const port = process.env.PORT || 5000
const host = process.env.HOST || 'http://localhost:5000/'
const server = express()

server.use(express.json())
server.use(cors()) 
server.use(morgan("dev")) 
/* server.use(helmet()) */

passport.use(googleStrategy)

// routers
server.use('/auth', authRouter)
server.use('/profile', profileRoutes)
server.use('/experiences', experiencesRoutes) // mettere autenticazione almeno nella POST e in me



mongoDbConnection()


server.listen(port, () => {
    console.log(`Server is listening at port ${port} at ${host}`)
})