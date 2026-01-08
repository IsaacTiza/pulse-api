import userModel from "../models/userModel.js";
import signJWT from "../utils/signJWT.js";
import AppError from "../utils/appError.js";
import crypto from "crypto";

// Recieves email, name, passwordConfirm and password and returns newUser and token if successful
//name, email, password and passwordConfirm
export const registerUser = async (name, email, password, passwordConfirm) => {
  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    throw new AppError("Email already in use", 400);
  }
  const newUser = await userModel.create({
    name,
    email,
    password,
    passwordConfirm,
  });
  const token = signJWT({ id: newUser._id, role: newUser.role });
  return { user: newUser, token };
};
// Recieves email and password and returns existingUser and token if successful
//email before password
export const loginUser = async (email, password) => {
  const existingUser = await userModel
    .findOne({ email })
    .select("+password")
    .where({ isDeleted: { $ne: true } });

  if (!existingUser || existingUser.isDeleted) {
    throw new AppError("Invalid credentials", 401);
  }
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
export const forgotPassword = async (email) => {
  const user = await userModel.findOne({ email });
  if (!email) throw new AppError("There is no user with email address.", 404);
  const restToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });
  const resetURL = `${process.env.CLIENT_URL}/resetPassword/${restToken}`;

  return resetURL;
};
export const resetPassword = async (
  resetToken,
  newPassword,
  passwordConfirm
) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  console.log(`hashedToken: ${hashedToken}`);

  const user = await userModel.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) throw new AppError("Token is invalid or has expired", 400);

  user.password = newPassword;
  user.passwordConfirm = passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  return user;
};
