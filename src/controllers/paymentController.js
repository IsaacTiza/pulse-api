import { upgradingToProPlan } from "../services/paymentServices.js";
import { catchAsync } from "../utils/catchAsync.js";

export const upgradeToPro = catchAsync(async(req, res, next) => {
    const amount = req.body.amount
    const upgradedUser = await upgradingToProPlan(req.user._id,amount)
    res.status(200).json({
        status: 'success',
        message: 'You have been Upgraded Sccessfully',
        upgradedUser
    })
})