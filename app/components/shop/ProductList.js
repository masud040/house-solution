import { getAllProducts } from "@/db/queries";
import ProductCard from "../card/ProductCard";
import { NoDataFound } from "../shared/NoDataFound";

export const ProductList = async ({ category, min_price, max_price }) => {
  const filteredProducts = await getAllProducts(category, min_price, max_price);
  return (
    <>
      {filteredProducts.length > 0 ? (
        <div class="col-span-3 grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <NoDataFound />
      )}
    </>
  );
};
