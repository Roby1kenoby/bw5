import express from 'express'
/* import { getAllProfile, getMe, loadBackImg, loadImage, editProfile, deleteProfile } from '../controllers/author.controller.js'; */
import { addProfile } from '../controllers/profile.controller.js';
/* import uploadCloudinary from '../middleware/uploadCloudinary.js'; */

const profileRoutes = express.Router()

profileRoutes.post('/', addProfile ) // sostituita da register

profileRoutes.get('/profile', /* getAllProfile */)

profileRoutes.get('/me', /* getMe */)

profileRoutes.put('/:id/backgroundImage', /* uploadCloudinary.single('avatar'), */ /* loadBackImg */)

profileRoutes.put('/:id/image', /* uploadCloudinary.single('backgroundImage'), */ /* loadImage */)

profileRoutes.put('/:id', /* editProfile */)

profileRoutes.delete('/:id', /* deleteProfile */) // commentata solo in profile.controllers

export default profileRoutes