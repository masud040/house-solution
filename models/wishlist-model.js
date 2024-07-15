const { Schema, default: mongoose } = require("mongoose");

const wishlistSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  productId: {
    type: String,
    required: true,
  },
});

export const WishlistModel =
  mongoose.models?.wishlist ?? mongoose.model("wishlist", wishlistSchema);
