import { freeProducts, proProducts } from "../services/productsServices.js"

export const getFeeProducts = async (req, res, next) => {
    const products = await freeProducts()
    res.status(200).json({
        status: "success",
        length: products.length,
        data: products
    })
}
export const getProProducts = async (req, res, next) => {
    const products = await proProducts()
    res.status(200).json({
        status: "success",
        length: products.length,
        data: products
    })
}