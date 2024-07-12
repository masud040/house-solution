const { Schema, default: mongoose } = require("mongoose");

const cartSchema = new Schema({
  userId: {
    type: String,
    required: true,
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

export const CartModel =
  mongoose.models.carts ?? mongoose.model("carts", cartSchema);
