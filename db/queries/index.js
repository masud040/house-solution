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

export { getAllCategory, getAllProducts };
