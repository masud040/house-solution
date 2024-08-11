import { removeMongoId, removeMongoIdFromObj } from "@/app/utils";
import { CartModel } from "@/models/carts-model";
import { CategoryModel } from "@/models/categories-model";
import { ProductModel } from "@/models/products-model";
import { reviewRatingModel } from "@/models/reviews-ratings-model";
import { UserModel } from "@/models/users-model";
import { WishlistModel } from "@/models/wishlist-model";
import mongoose from "mongoose";
import connectMongo from "../connectMongo";

// get all products with filters
async function getAllProducts(category, min_price, max_price, search_term) {
  await connectMongo();
  const totalProducts = await ProductModel.find().lean();
  let allProducts = totalProducts;

  if (category) {
    const categoriesToMatch = category.toLowerCase().split("|");

    allProducts = allProducts.filter((product) =>
      categoriesToMatch.includes(product.category.toLowerCase())
    );
  }
  if (min_price && max_price) {
    allProducts = allProducts.filter(
      (product) => product.price >= min_price && product.price <= max_price
    );
  }
  if (search_term) {
    allProducts = allProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(search_term.toLowerCase()) ||
        product.details.toLowerCase().includes(search_term.toLowerCase())
    );
  }

  return removeMongoId(allProducts);
}

// find product by id
async function getProductById(id) {
  await connectMongo();
  const product = await ProductModel.findById(id).lean();
  return removeMongoIdFromObj(product);
}

// get all categories
async function getAllCategory() {
  await connectMongo();
  const allCategory = await CategoryModel.find().lean();
  return removeMongoId(allCategory);
}

// find to new arrival products
async function getNewArrivalProducts() {
  const date = new Date();
  date.setDate(date.getDate() - 90);

  await connectMongo();
  const products = await ProductModel.find({
    createdAt: { $gte: date.getTime() },
  })
    .select(["name", "price", "thumbnail", "discount"])
    .lean();

  return removeMongoId(products);
}
// get rating for product
async function findRatingProducts(id) {
  await connectMongo();
  const ratings = await reviewRatingModel.find({});
}

// get trending products
async function getTrendingProducts() {
  await connectMongo();
  const allProducts = await ProductModel.find().lean();
  return removeMongoId(allProducts?.slice(0, 8));
}
// get products by category
async function getProductsCountByCategory() {
  await connectMongo();
  const allCategory = await getAllCategory();
  const productsCountByCategory = await Promise.all(
    allCategory.map(async (category) => {
      const regex = new RegExp(category.value, "i");
      const products = await ProductModel.find({
        category: { $regex: regex },
      }).lean();

      return { name: category.value, products: products.length };
    })
  );
  return productsCountByCategory;
}

// get user by email
async function getUserByEmail(email) {
  await connectMongo();
  if (email) {
    const user = await UserModel.findOne({ email: email }).lean();
    return removeMongoIdFromObj(user);
  }
}

// add to cart if it already exists update it quantity
async function setItemInCart(cartData) {
  try {
    await connectMongo();
    if (cartData) {
      const found = await CartModel.findOne({ productId: cartData.productId });
      if (!found) {
        await CartModel.create(cartData);
        return {
          status: 200,
          message: "Item added successfully",
        };
      } else {
        return {
          status: 200,
          message: "This item has already been added",
        };
      }
    } else {
      return { status: 400, message: "Invalid cart data" };
    }
  } catch (error) {
    throw new Error(error.message);
  }
}
// add to wishlist if already added delet from wishlist
async function updateWishlist(productId, userId) {
  try {
    await connectMongo();
    const product = await ProductModel.findById(productId);
    if (product) {
      const foundUser = product.wishlist?.find(
        (id) => id.toString() === userId
      );
      if (foundUser) {
        product.wishlist.pull(new mongoose.Types.ObjectId(userId));
      } else {
        product.wishlist.push(new mongoose.Types.ObjectId(userId));
      }
    }
    product.save();
  } catch (error) {
    throw new Error(error.message);
  }
}

// get all cart items
async function getCartData(userEmail) {
  try {
    if (userEmail) {
      const user = await getUserByEmail(userEmail);
      const response = await CartModel.find({
        userId: user.id,
      }).lean();
      return removeMongoId(response);
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

// get all cart items by id
async function getAllCartItemsById(userEmail, selected) {
  if (userEmail) {
    let allCartItems;
    const cartData = await getCartData(userEmail);
    allCartItems = await Promise.all(
      cartData.map(async (item) => {
        const product = await ProductModel.findById(item.productId)
          .select(["name", "thumbnail", "stock", "price", "discount"])
          .lean();
        product["quantity"] = item.quantity;
        product["userId"] = item.userId;
        return product;
      })
    );
    const selectedArr = selected?.split(",");
    if (selectedArr?.length > 0) {
      allCartItems.forEach((item) => {
        if (selectedArr.includes(item._id.toString())) {
          item["selected"] = true;
        }
      });
    }
    return removeMongoId(allCartItems);
  }
}

// get all wishlist items by id
async function getAllWishlistById(userEmail) {
  if (userEmail) {
    let allWishlistItems;
    const user = await getUserByEmail(userEmail);
    const wishListData = await WishlistModel.find({
      userId: user.id,
    }).lean();
    allWishlistItems = await Promise.all(
      wishListData.map(async (item) => {
        const product = await ProductModel.findById(item.productId)
          .select(["name", "thumbnail", "stock", "price", "discount"])
          .lean();
        product["userId"] = item.userId;
        return product;
      })
    );

    return removeMongoId(allWishlistItems);
  }
}

async function getDeleveryCost(cartItems) {
  const shippingCost = 5;
  const totalshippingCost = cartItems.reduce(
    (total, item) => total + item.quantity * shippingCost,
    0
  );
  return totalshippingCost;
}

async function updateQuantity(productId, userId, type) {
  try {
    const product = await CartModel.findOne({
      productId: productId,
      userId: userId,
    });

    if (type === "increase") {
      product.quantity += 1;
    } else {
      product.quantity -= 1;
    }
    product.save();
    return {
      status: 200,
      message: "Quantity updated successfully.",
    };
  } catch (error) {
    console.log(error);
  }
}

async function deleteAddedItem(productId, userId, from) {
  try {
    if (from === "cart") {
      const respose = await CartModel.deleteOne({
        productId: productId,
        userId: userId,
      });
      return {
        status: 200,
        message: "Item deleted successfully from cart.",
      };
    } else {
      return {
        status: 404,
        message: "Item not found in cart.",
      };
    }
    if (from === "wishlist") {
      const respose = await WishlistModel.deleteOne({
        productId: productId,
        userId: userId,
      });
      return {
        status: 200,
        message: "Item deleted successfully from wishlist.",
      };
    } else {
      return {
        status: 404,
        message: "Item not found in wishlist.",
      };
    }
  } catch (error) {
    console.log(error);
    throw new Error({ status: 500, message: "Failed to delete item." });
  }
}

export {
  deleteAddedItem,
  getAllCartItemsById,
  getAllCategory,
  getAllProducts,
  getAllWishlistById,
  getCartData,
  getDeleveryCost,
  getNewArrivalProducts,
  getProductById,
  getProductsCountByCategory,
  getTrendingProducts,
  getUserByEmail,
  setItemInCart,
  updateQuantity,
  updateWishlist,
};
