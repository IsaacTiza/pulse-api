import productModel from "../models/productModel.js"

export const freeProducts = async () => {
    return await productModel.find({tier:"free"})
}
export const proProducts = async () => {
    return await productModel.find({tier:"pro"})
}
export const productsAverage = async (userPlan) => {
    const matchStage = userPlan === 'pro' ? {} : { tier: 'free' };

    const stats = await productModel.aggregate([
        { $match: matchStage },
        {
            $group: {
                _id: null,
                averagePrice: { $avg: "$price" },
                totalProducts: { $sum: 1 }
            }
        }
    ]);
    return stats[0] || { averagePrice: 0, totalProducts: 0 };   
}