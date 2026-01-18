import userModel from "../models/userModel.js";
import AppError from "../utils/appError.js";
import APIFeatures from "../utils/APIfeatures.js";

//USER SERVICES

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


//ADMIN SERVICES
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
   export const getAllUsers = async (query) => {
     const features = new APIFeatures(userModel.find(),query)
       .filter()
       .sort()
       .limitFields()
       .paginate();

   return  await features.query;
}
export const createNewUser = async (data) => {
  const newUser = await userModel.create(data);
  return newUser;
}
export const getUserById = async (userId) => {
  const user = await userModel.findById(userId);
  if (!user || user.isDeleted) {
    throw new AppError("User not found or deleted", 404);
  }
  return user;
}
export const hardDeleteUser = async (userId) => {
  return await userModel.findByIdAndDelete(userId);
}
export const updateUserByAdmin = async (userId, data) => {
  const updatedUser = await userModel.findByIdAndUpdate(
    userId,
    { $set: data },
    { new: true, runValidators: true }
  );
  return updatedUser;
};