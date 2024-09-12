import express from 'express'
import { addExperience, getExperiences, getUserExperiences, updateExperience, deleteExperience, uploadImageExperience } from '../controllers/experiences.controller.js';
import uploadCloudinary from '../middlewares/uploadCloudinary.js'; 
import authentication from '../middlewares/authentication.js';

const experiencesRoutes = express.Router()

experiencesRoutes.get('/:userId/experiences', getUserExperiences);

experiencesRoutes.get('/me/experiences', authentication, getExperiences);

experiencesRoutes.post('/', authentication, addExperience);

experiencesRoutes.put('/:expId/image', uploadCloudinary.single('imageExperience'), uploadImageExperience);

experiencesRoutes.put('/:expId', updateExperience);

experiencesRoutes.delete('/:expId', deleteExperience);

export default experiencesRoutes;