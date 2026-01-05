import express from 'express';
import authRouter from "./routes/authRoutes.js";
import AppError from "./utils/appError.js";
import globalErrorHandler from "./middlewares/errorMiddleware.js";

const app = express();

app.use(express.json());

app.use("/api/v1", authRouter);
app.use("/api/v1", authRouter);

// Handle unknown routes
app.use((req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl}`, 404));
});

// Global error handler (MUST be last)
app.use(globalErrorHandler);
export default app;