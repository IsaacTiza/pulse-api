import { freeProducts, productsAverage, proProducts } from "../services/productsServices.js"
import { catchAsync } from "../utils/catchAsync.js"

export const getFeeProducts = catchAsync(async (req, res, next) => {
    const products = await freeProducts()
    res.status(200).json({
        status: "success",
        length: products.length,
        data: products
    })
})
export const getProProducts =catchAsync( async (req, res, next) => {
    const products = await proProducts()
    res.status(200).json({
        status: "success",
        length: products.length,
        data: products
    })
})
export const getProductsAverage = catchAsync(async (req, res, next) => { 
    const userPlan = req.user.subscription.plan
    let productStats = await productsAverage(userPlan)
    res.status(200).json({
        status: "success",
        data: productStats
    })
})