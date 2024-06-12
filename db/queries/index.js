import { ProductModel } from "@/models/products-model";
import connectMongo from "../connectMongo";

async function getAllProducts() {
  await connectMongo();
  const allProducts = await ProductModel.find();
  return allProducts;
}

export { getAllProducts };
