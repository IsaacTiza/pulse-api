import express from 'express'
import { getFeeProducts, getProductsAverage, getProProducts } from '../controllers/productController.js'
import { protect, requirePro } from '../middlewares/authMiddleware.js'

const router = express.Router()
router.get('/free-products', protect, getFeeProducts)
router.get('/pro-products', protect, requirePro, getProProducts)

//Statistics
router.get('/products-average',protect, getProductsAverage)
export default router