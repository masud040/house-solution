const { Schema, default: mongoose } = require("mongoose");

const shippingAddresSchema = new Schema({
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

  fullName: {
    type: String,
    required: true,
  },
});

export const ShippingAddrsstModel =
  mongoose.models?.shipping_addresses ??
  mongoose.model("shipping_addresses", shippingAddresSchema);
