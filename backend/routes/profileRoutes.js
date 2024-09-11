import express from 'express'
import { getSpecificProfile, registerProfile, getAllProfile, putbackImage, putAvatar, editProfile, deleteProfile } from '../controllers/profile.controller.js';
import uploadCloudinary from '../middlewares/uploadCloudinary.js'; 
import authentication from '../middlewares/authentication.js';

const profileRoutes = express.Router()

profileRoutes.post('/', uploadCloudinary.single('avatar'), registerProfile ) 

profileRoutes.get('/', getAllProfile )

profileRoutes.get('/:id', authentication, getSpecificProfile)

profileRoutes.put('/:id/backgroundImage', authentication, uploadCloudinary.single('backgroundImage'), putbackImage )

profileRoutes.put('/:id/image', authentication, uploadCloudinary.single('avatar'), putAvatar )

profileRoutes.put('/:id', authentication, editProfile )

profileRoutes.delete('/:id', authentication, deleteProfile ) 

export default profileRoutes