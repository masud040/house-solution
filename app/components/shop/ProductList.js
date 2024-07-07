import { getAllProducts } from "@/db/queries";

export const ProductList = async ({ category }) => {
  const filteredProducts = await getAllProducts(category);
  console.log(filteredProducts.length);
  return <div class="col-span-3"></div>;
};
