const { Schema, default: mongoose } = require("mongoose");

const paymentSchema = new Schema({
  paid: {
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

export const PaymentModel =
  mongoose.models.payments ?? mongoose.model("payments", paymentSchema);
