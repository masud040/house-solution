const { Schema, default: mongoose } = require("mongoose");

const paymentSchema = new Schema({
  paid: {
    type: Boolean,
    required: true,
  },
  totalAmount: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  trans_id: {
    type: String,
    required: true,
  },
  order_items_id: {
    type: [String],
    required: true,
  },
  order_id: {
    type: String,
    required: true,
  },
});

export const PaymentModel =
  mongoose.models.payments ?? mongoose.model("payments", paymentSchema);
