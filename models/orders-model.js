const { Schema, default: mongoose } = require("mongoose");

const ordersSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  orderId: {
    type: String,
    required: true,
  },
  ongoing_status: {
    type: String,
    required: true,
    default: "processing",
  },
  status: {
    type: String,
    required: true,
    default: "pending",
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  productId: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

export const OrdersModel =
  mongoose.models.orders ?? mongoose.model("orders", ordersSchema);
