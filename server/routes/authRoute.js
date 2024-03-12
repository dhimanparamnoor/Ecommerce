import express from 'express'
import { registerController,loginController, testController } from '../controllers/authControllers.js'
import { isAdmin, reqireSignIn } from '../middlewares/authMiddleware.js'

const router = express.Router()


router.post('/register', registerController)

router.post('/login',loginController)

router.post('/test',reqireSignIn,isAdmin,testController)

export default router;