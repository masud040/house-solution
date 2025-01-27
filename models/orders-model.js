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
    default: "to-pay",
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
  products: {
    type: [Object],
    required: true,
    default: [],
  },
});

export const OrdersModel =
  mongoose.models.orders ?? mongoose.model("orders", ordersSchema);
