import { registerUser, loginUser, forgotPassword, resetPassword } from "../services/authService.js";
import { createNewUser, deleteUser, getAllUsers, getProfile, getUserById, hardDeleteUser, restoreUser, updateUser, updateUserByAdmin } from "../services/userService.js";
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
    const deletedUser = await deleteUser(req.user._id);
    res.status(204).json({
        status: `success`,
      message: `Account Deleted Successfully`,
        data:{ deletedUser}
    })
})
export const forgetPassword= catchAsync(async (req, res) => {
    const { email } = req.body;
  if (!email) throw new AppError("Please provide email", 400);
    const resetURL = await forgotPassword(email);
    res.status(200).json({
      status: `success`,
      message: `Password reset token sent to email!`,
      data: {
        resetURL,
      },
    });
});
export const passwordReset= catchAsync(async (req, res) => {
    const { resetToken } = req.params;
  const { newPassword, passwordConfirm } = req.body;  
  if (!newPassword || !passwordConfirm) {
    throw new AppError("Please provide new password and password confirm", 400);
  }
    await resetPassword(resetToken, newPassword, passwordConfirm);
    res.status(200).json({
      status: `success`,
      message: `Password reset successful! Please log in with your new password.`,
    });
}); 

//ADMIN CONTROLLERS CAN BE ADDED HERE LATER
export const adminGetAllUsers = catchAsync(async (req, res) => {
  console.log(req.query)
    const users = await getAllUsers(req.query);
    res.status(200).json({
      status: `success`,
      results: users.length,
      data: {
        users,
      },
    });
});
export const adminCreateUser = catchAsync(async (req, res) => {
  const newUser = await createNewUser(req.body);
  res.status(201).json({
    status: `success`,
    data: {
      user: newUser,
    },
  });
});
export const adminGetUserById = catchAsync(async (req, res) => {
  const user = await getUserById(req.params.id);
  res.status(200).json({
    status: `success`,
    data: {
      user,
    },
  });
});
export const adminHardDeleteUser = catchAsync(async (req, res) => {
  await hardDeleteUser(req.params.id);
  res.status(200).json({
    status: `success`,
    message: `User permanently deleted`,
    data: null,
  });
})
export const adminUpdateUserById = catchAsync(async (req, res) => {
  const updatedUser = await updateUserByAdmin(req.params.id, req.body);
  res.status(200).json({  
    status: `success`,
    message: `User updated successfully`,
    data: {
      user: updatedUser,
    },
  });
});
export const adminRestoreUser = catchAsync(async (req, res) => {
    const restoredUser = await restoreUser(req.params.id);
  res.status(200).json({
    status: `success`,
    message: `User restored successfully`,
    data: {
      user: restoredUser,
    },
  });
});