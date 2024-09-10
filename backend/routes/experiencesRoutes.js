import express from 'express'
import { addExperience, getExperiences } from '../controllers/experiences.controller.js';
import uploadCloudinary from '../middlewares/uploadCloudinary.js'; 

const experiencesRoutes = express.Router()

experiencesRoutes.post('/', addExperience ) 

experiencesRoutes.get('/', getExperiences ) 



export default experiencesRoutes