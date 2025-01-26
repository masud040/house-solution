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
  status: {
    type: String,
    required: true,
    default: "to-pay",
  },
  createdAt: {
    type: Date,
    required: true,
  },
  products: {
    type: [Object],
    required: true,
    default: [],
  },
});

export const OrdersModel =
  mongoose.models.orders ?? mongoose.model("orders", ordersSchema);
