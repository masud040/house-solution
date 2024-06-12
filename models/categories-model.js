import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

export const CategoryModel =
  mongoose.models.categories ?? mongoose.model("categories", categorySchema);
