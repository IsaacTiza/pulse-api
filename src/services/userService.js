import userModel from "../models/userModel.js";
import AppError from "../utils/appError.js";

export const getProfile = async (userId) => {
  const existingUser = await userModel.findById(userId);
  if (!existingUser) throw new AppError("Please Login!", 401);
  return existingUser;
};
export const updateUser = async (userId, data) => {
console.log(await userModel.findById(userId))
const updatedUser=  await userModel.findByIdAndUpdate(
    userId,
    { $set: data },
    { new: true, runValidators: true }
    );
console.log(updatedUser)
return updatedUser
};
export const deleteUser = async (userId) => {
    //Implementing Soft Delete
    let user = await userModel.findById(userId)
    if (!user.isActive) throw new AppError('User as already been deleted', 401)
    user.isActive = false
    user.save()
    return true
}
