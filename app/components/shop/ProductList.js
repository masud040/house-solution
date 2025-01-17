import { auth } from "@/auth";
import { getAllProducts, getUserByEmail } from "@/db/queries";
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
  const session = await auth();
  const user = await getUserByEmail(session?.user?.email);

  return (
    <>
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 col-span-2 gap-4 md:grid-cols-2 lg:col-span-3 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} userId={user?.id} />
          ))}
        </div>
      ) : (
        <NoDataFound />
      )}
    </>
  );
};
