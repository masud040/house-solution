import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  reviews: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  SKU: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  size: {
    type: String,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  tags: {
    type: Array,
    required: true,
  },
  keywords: {
    type: Array,
    required: true,
  },
  images: {
    type: Array,
    required: true,
  },
});

export const ProductModel =
  mongoose.models.products ?? mongoose.model("products", productSchema);
