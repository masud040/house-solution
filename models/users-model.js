import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: false,
    default: "user",
  },
  mobile: {
    type: String,
    required: false,
  },
});

export const UserModel =
  mongoose.models.users ?? mongoose.model("users", userSchema);
