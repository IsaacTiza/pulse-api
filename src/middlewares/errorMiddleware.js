import AppError from "../utils/appError.js";
const sendErrorDev = (err, res) => {
  console.log(err);
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    error: err,
  });
};
const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error("ERROR", err);
    res.status(500).json({
      status: "error",
      message: "Something went wrong!",
    });
  }
};

export default (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    if (error.name === "CastError") {
      error = new AppError(`Invalid ${error.path}: ${error.value}`, 400);
    }
    if (error.code === 11000) {
      error = new AppError(
        `Duplicate field value: ${JSON.stringify(
          error.keyValue
        )}. Please use another value!`,
        400
      );
    }
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((el) => el.message);
      error = new AppError(`Invalid input data. ${errors.join(". ")}`, 400);
    }
    if (error.name === "JsonWebTokenError") {
      error = new AppError("Invalid token. Please log in again!", 401);
    }
    if (error.name === "TokenExpiredError") {
      error = new AppError("Your token has expired! Please log in again.", 401);
    }

    sendErrorProd(error, res);
  }
};
