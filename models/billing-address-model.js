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
    type: String,
    required: true,
  },
  isUseShipping: {
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
  mongoose.models?.billing_addresses ??
  mongoose.model("billing_addresses", billingAddresSchema);
