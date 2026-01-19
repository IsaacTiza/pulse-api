//Packages
import express from 'express';
import morgan from 'morgan';
import qs from 'qs';
//Routers
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoute.js";
import paymentRoute from "./routes/paymentRoute.js"
import productRoute from "./routes/productsRoutes.js"
//Utils & Middlewares
import AppError from "./utils/appError.js";
import globalErrorHandler from "./middlewares/errorMiddleware.js";

const app = express();

app.use(express.json());
// Use qs for parsing query strings
app.set('query parser', str => qs.parse(str));
app.use(morgan('dev'));
//Test Router: Default Get Request
app.get("/api/v1/test", (req, res) => {
  res.send("API is working");
});
app.post("/api/v1/test", (req, res) => {
  res.send(req.body);
});
//Mount Routers
app.use("/api/v1", authRouter);
app.use("/api/v1", userRouter);
app.use("/api/v1", paymentRoute)
app.use("/api/v1", productRoute)

// Handle unknown routes
app.use((req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl}`, 404));
});

// Global error handler (MUST be last)
app.use(globalErrorHandler);
export default app;