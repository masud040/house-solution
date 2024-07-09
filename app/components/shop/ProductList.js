import { getAllProducts } from "@/db/queries";
import ProductCard from "../card/ProductCard";
import { NoDataFound } from "../shared/NoDataFound";

export const ProductList = async ({
  category,
  min_price,
  max_price,
  search_term,
}) => {
  const filteredProducts = await getAllProducts(
    category,
    min_price,
    max_price,
    search_term
  );

  return (
    <>
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 col-span-3 gap-4 lg:grid-cols-2">
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
