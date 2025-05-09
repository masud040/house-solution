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
  cus_id: {
    type: String,
    required: true,
  },
  order_ids: {
    type: [String],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const PaymentModel =
  mongoose.models.payments ?? mongoose.model("payments", paymentSchema);
