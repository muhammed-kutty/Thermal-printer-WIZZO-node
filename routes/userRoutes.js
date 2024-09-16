import express from 'express'
import { UserLogin , UserRegister } from '../controllerss/userController.js'

const router = express.Router()

router.post('/login',UserLogin)
router.post('/register',UserRegister)


export default router 