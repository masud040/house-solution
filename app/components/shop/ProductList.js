import { getAllProducts } from "@/db/queries";
import ProductCard from "../card/ProductCard";
import { NoDataFound } from "../shared/NoDataFound";

export const ProductList = async ({ category }) => {
  const filteredProducts = await getAllProducts(category);
  return (
    <>
      {filteredProducts.length > 0 ? (
        <div class="col-span-3">
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
