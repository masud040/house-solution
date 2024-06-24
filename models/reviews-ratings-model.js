import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";

const ratingSchema = new Schema({
  rating: {
    type: Number,
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
  userId: {
    type: ObjectId,
    required: true,
  },
});

export const reviewRatingModel =
  mongoose.models?.reviews_ratings ??
  mongoose.model("reviews_ratings", ratingSchema);
