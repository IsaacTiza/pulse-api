import express from 'express'
import { protect } from '../middlewares/authMiddleware.js'
import { upgradeToPro } from '../controllers/paymentController.js'

const router = express.Router()

router.post('/upgrade-to-pro', protect, upgradeToPro)

export default router