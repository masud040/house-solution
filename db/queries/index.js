import { removeMongoId } from "@/app/utils";
import { CategoryModel } from "@/models/categories-model";
import { ProductModel } from "@/models/products-model";
import { reviewRatingModel } from "@/models/reviews-ratings-model";
import connectMongo from "../connectMongo";

async function getAllProducts(category, min_price, max_price, search_term) {
  await connectMongo();
  const totalProducts = await ProductModel.find().lean();
  let allProducts = totalProducts;

  if (category) {
    const categoriesToMatch = category.split("|");

    allProducts = allProducts.filter((product) => {
      return categoriesToMatch.includes(product.category.toLowerCase());
    });
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

export {
  getAllCategory,
  getAllProducts,
  getNewArrivalProducts,
  getProductsCountByCategory,
  getTrendingProducts,
};
