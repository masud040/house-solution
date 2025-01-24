const { Schema, default: mongoose } = require("mongoose");

const successSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  orderId: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "Processing",
  },
  date: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  products: {
    type: [Object],
    required: true,
    default: [],
  },
});

export const SuccessModel =
  mongoose.models.success_orders ??
  mongoose.model("success_orders", successSchema);
