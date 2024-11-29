const { Schema, default: mongoose } = require("mongoose");

const billingAddresSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  province: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  area: {
    type: String,
    required: true,
  },
  landmark: {
    type: Number,
    required: true,
  },
  isUseBilling: {
    type: Boolean,
    required: true,
    default: false,
  },
  fullName: {
    type: String,
    required: true,
  },
});

export const BillingAddrsstModel =
  mongoose.models?.billing_address ??
  mongoose.model("billing_address", billingAddresSchema);
