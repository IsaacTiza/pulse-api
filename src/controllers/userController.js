import { registerUser, loginUser } from "../services/authService.js";
import { catchAsync } from "../utils/catchAsync.js";

export const createUser = catchAsync(async (req, res) => {
  console.log("Reached CREATEUSER");
  const { name, email, password, passwordConfirm } = req.body;
  const { user, token } = await registerUser(
    name,
    email,
    password,
    passwordConfirm
    );
    console.log(user,token)
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
