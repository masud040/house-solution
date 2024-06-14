import { removeMongoId } from "@/app/utils";
import { CategoryModel } from "@/models/categories-model";
import { ProductModel } from "@/models/products-model";
import connectMongo from "../connectMongo";

async function getAllProducts() {
  await connectMongo();
  const allProducts = await ProductModel.find().lean();
  return removeMongoId(allProducts);
}

async function getAllCategory() {
  await connectMongo();
  const allCategory = await CategoryModel.find().lean();
  return removeMongoId(allCategory);
}

async function getNewArrivalProducts() {
  const date = new Date();
  date.setDate(date.getDate() - 30);

  await connectMongo();
  const products = await ProductModel.find({
    createdAt: { $gte: date.getTime() },
  })
    .select(["name", "price", "thumbnail", "ratings", "discount", "reviews"])
    .lean();

  return removeMongoId(products);
}

export { getAllCategory, getAllProducts, getNewArrivalProducts };
