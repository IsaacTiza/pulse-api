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

     return await userModel.findByIdAndUpdate(
       userId,
       {
         isDeleted: true,
         deletedAt: new Date(),
       },
       { new: true }
     );
};

//  admin function to restore a soft-deleted user
   export const restoreUser = async (userId) => {
     return await userModel.findByIdAndUpdate(
       userId,
       {
         isDeleted: false,
         deletedAt: null,
       },
       { new: true }
     );
   };



