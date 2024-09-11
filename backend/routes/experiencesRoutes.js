import express from 'express'
import { addExperience, getExperiences, getUserExperiences, updateExperience, deleteExperience, uploadImageExperience } from '../controllers/experiences.controller.js';
import uploadCloudinary from '../middlewares/uploadCloudinary.js'; 

const experiencesRoutes = express.Router()

experiencesRoutes.get('/:userId/experiences', getUserExperiences);

experiencesRoutes.get('/me/experiences', getExperiences);

experiencesRoutes.post('/', addExperience);

experiencesRoutes.put('/:expId/image', uploadCloudinary.single('imageExperience'), uploadImageExperience);

experiencesRoutes.put('/:expId', updateExperience);

experiencesRoutes.delete('/:expId', deleteExperience);

export default experiencesRoutes;