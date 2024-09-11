import express from 'express'
import { registerProfile, getAllProfile, putbackImage, putAvatar, editProfile, deleteProfile } from '../controllers/profile.controller.js';
import uploadCloudinary from '../middlewares/uploadCloudinary.js'; 

const profileRoutes = express.Router()

profileRoutes.post('/', uploadCloudinary.single('avatar'), registerProfile ) 

profileRoutes.get('/', getAllProfile )

/* profileRoutes.get('/me', getMe) */

profileRoutes.put('/:id/backgroundImage', uploadCloudinary.single('backgroundImage'), putbackImage )

profileRoutes.put('/:id/image', uploadCloudinary.single('avatar'), putAvatar )

profileRoutes.put('/:id', editProfile )

profileRoutes.delete('/:id', deleteProfile ) 

export default profileRoutes