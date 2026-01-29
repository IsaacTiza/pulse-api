import paymentModel from "../models/paymentModel.js"
import userModel from "../models/userModel.js"
import AppError from "../utils/appError.js"

export const upgradingToProPlan = async (userId,amount) => {
    const user = await userModel.findByIdAndUpdate(userId, {
        $set: {
            "subscription.plan": "pro",
            "subscription.status": "active",
            "expiresAt":Date.now()
        },
        
    }, { new: true })
    if (!user) {
         await paymentModel.create({
           user: userId,
           amount, // assuming a fixed amount for pro plan
           status: "failed",
         });
        throw new AppError("Please Login!")
    }
    if (user.subscription.plan === 'pro') {
        throw new AppError("You are alreadt a pro member!", 401)
    }
    await paymentModel.create({
        user: userId,
        amount, // assuming a fixed amount for pro plan
        status:"success"
    })
    return user
}