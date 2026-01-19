import mongoose from "mongoose";

const paymentSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    amount: {
      type: Number,
      required: [true, "Payment must have an amount!"],
    },
    status: {
      type: String,
      enum: ["failed", "success"],
      default: "success",
    },
    provider: {
      type: String,
      default: "manual",
    },
  },
  {
    timestamp: true,
  }
);

export default mongoose.model("Payment", paymentSchema);