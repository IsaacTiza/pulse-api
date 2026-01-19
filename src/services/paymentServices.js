import userModel from "../models/userModel.js"
import AppError from "../utils/appError.js"

export const upgradingToProPlan = async (userId) => {
    const user = await userModel.findByIdAndUpdate(userId, {
        $set: {
            "subscription.plan": "pro",
            "subscription.status":"active"
        },
        
    },{new:true})
    if(!user) return new AppError("Please Login!")
    // user.subscription.plan = 'pro'
    // user.subscription.status = 'active'
    // user.save({runValidation:false})
    return user
}