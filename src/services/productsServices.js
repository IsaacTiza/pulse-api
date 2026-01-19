import productModel from "../models/productModel.js"

export const freeProducts = async () => {
    return await productModel.find({tier:"free"})
}
export const proProducts = async () => {
    return await productModel.find({tier:"pro"})
}