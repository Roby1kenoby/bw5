import express from 'express'
import { addExperience } from '../controllers/experiences.controller.js';
import uploadCloudinary from '../middlewares/uploadCloudinary.js'; 

const experiencesRoutes = express.Router()

experiencesRoutes.post('/', addExperience ) 

export default experiencesRoutes