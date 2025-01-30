import { auth } from "@/auth";
import { getAllProducts, getUserByEmail } from "@/db/queries";
import ProductCard from "../../shared/card/ProductCard";
import { NoDataFound } from "../../shared/NoDataFound";
import Pagination from "./Paigination";

export const ProductList = async ({
  category,
  min_price,
  max_price,
  search_term,
  page,
}) => {
  const filteredProducts = await getAllProducts(
    category,
    min_price,
    max_price,
    search_term,
    page
  );

  const session = await auth();
  const user = await getUserByEmail(session?.user?.email);

  return (
    <>
      {filteredProducts?.products.length > 0 ? (
        <div className="col-span-2 lg:col-span-3 ">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                userId={user?.id}
              />
            ))}
          </div>

          {/* <Paiginaiton/> */}
          <Pagination
            total={filteredProducts.total}
            page={filteredProducts.page}
            pages={filteredProducts.pages}
          />
        </div>
      ) : (
        <NoDataFound />
      )}
    </>
  );
};
