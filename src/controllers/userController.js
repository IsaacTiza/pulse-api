import { registerUser, loginUser } from "../services/authService.js";
import { deleteUser, getProfile, updateUser } from "../services/userService.js";
import { catchAsync } from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

export const createUser = catchAsync(async (req, res) => {
  const { name, email, password, passwordConfirm } = req.body;
  if (!name || !email || !password || !passwordConfirm) {
    throw new AppError("Please provide all fields", 400);
  }
  const { user, token } = await registerUser(
    name,
    email,
    password,
    passwordConfirm
  );
  console.log(user, token);
  res.status(201).json({
    status: `success`,
    message: `User created successfully`,
    token,
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    },
  });
});
export const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new AppError("Please provide email and password", 400);
  }
  const { existingUser, token } = await loginUser(email, password);

  res.status(200).json({
    status: "success",
    message: `Logged in successfully`,
    token,
    data: {
      User: {
        id: existingUser._id,
        email: existingUser.email,
        role: existingUser.role,
      },
    },
  });
});
export const profile = catchAsync(async (req, res) => {
  const user = await getProfile(req.user._id);
  console.log(user);
  res.status(200).json({
    status: `success`,
    data: {
      name: user.name,
      email: user.email,
      subscription: user.subscription,
      role: user.role,
    },
  });
});
// Implementation for updating user profile
export const updateProfile = catchAsync(async (req, res) => {
  // Only the name and email updaing for now
    
    const { name, email } = req.body;
    console.log(name,email)
  if (!email && !name) throw new AppError("Nothing to Update", 400);
    const user = await updateUser(req.user._id, { name, email });
    console.log(user)

  res.status(200).json({
    ststus: `success`,
    message: `Profile updated Successfully`,
    data: {
      updatedUser: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
    },
  });
});
export const deleteAccount = catchAsync(async (req, res) => {
    await deleteUser(req.user._id)
    res.status(204).json({
        status: `success`,
        message:`Account Deleted Successfully`,
    })
})
