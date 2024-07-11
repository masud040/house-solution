import { removeMongoId, removeMongoIdFromObj } from "@/app/utils";
import { CategoryModel } from "@/models/categories-model";
import { ProductModel } from "@/models/products-model";
import { reviewRatingModel } from "@/models/reviews-ratings-model";
import { UserModel } from "@/models/users-model";
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

async function getProductById(id) {
  await connectMongo();
  const product = await ProductModel.findById(id).lean();
  return removeMongoIdFromObj(product);
}

async function getAllCategory() {
  await connectMongo();
  const allCategory = await CategoryModel.find().lean();
  return removeMongoId(allCategory);
}

async function getNewArrivalProducts() {
  const date = new Date();
  date.setDate(date.getDate() - 60);

  await connectMongo();
  const products = await ProductModel.find({
    createdAt: { $gte: date.getTime() },
  })
    .select(["name", "price", "thumbnail", "discount"])
    .lean();

  return removeMongoId(products);
}
async function findRatingProducts(id) {
  await connectMongo();
  const ratings = await reviewRatingModel.find({});
}

async function getTrendingProducts() {
  await connectMongo();
  const allProducts = await ProductModel.find().lean();
  return removeMongoId(allProducts?.slice(0, 8));
}
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
  const user = await UserModel.findOne({ email: email }).lean();
  return removeMongoIdFromObj(user);
}

// add to cart or remove from cart
async function updateCart(productId, userId) {
  try {
    await connectMongo();
    const product = await ProductModel.findById(productId);
    if (product) {
      const foundUser = product.cart?.find((id) => id.toString() === userId);
      if (foundUser) {
        product.cart.pull(new mongoose.Types.ObjectId(userId));
      } else {
        product.cart.push(new mongoose.Types.ObjectId(userId));
      }
    }
    product.save();
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getCartItems(userEmail) {
  const user = await getUserByEmail(userEmail);
  if (user) {
    const products = await ProductModel.find({
      cart: new mongoose.Types.ObjectId(user.id),
    }).lean();
    return products;
  }
}

export {
  getAllCategory,
  getAllProducts,
  getCartItems,
  getNewArrivalProducts,
  getProductById,
  getProductsCountByCategory,
  getTrendingProducts,
  getUserByEmail,
  updateCart,
};
