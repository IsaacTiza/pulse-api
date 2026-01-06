import user from "../models/userModel.js";
import signJWT from "../utils/signJWT.js";
import AppError from "../utils/appError.js";

// Recieves email, name, passwordConfirm and password and returns newUser and token if successful
//name, email, password and passwordConfirm
export const registerUser = async (name, email, password, passwordConfirm) => {
  const existingUser = await user.findOne({ email });
  if (existingUser) {
    throw new AppError("Email already in use", 400);
  }
  const newUser = await user.create({ name, email, password, passwordConfirm });
  const token = signJWT({ id: newUser._id, role: newUser.role });
  return { user: newUser, token };
};
// Recieves email and password and returns existingUser and token if successful
//email before password
export const loginUser = async (email, password) => {
  const existingUser = await user.findOne({ email }).select("+password");
  if (
    !existingUser ||
    !(await existingUser.correctPassword(password, existingUser.password))
  ) {
    throw new AppError("Incorrect email or password", 401);
  }
  const token = signJWT({ id: existingUser._id, role: existingUser.role });
  existingUser.lastLoginDate = new Date();
  await existingUser.save({ validateBeforeSave: false });
  return { existingUser, token };
};
