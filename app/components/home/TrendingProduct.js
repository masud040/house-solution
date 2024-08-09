import { auth } from "@/auth";
import { getTrendingProducts, getUserByEmail } from "@/db/queries";
import ProductCard from "../card/ProductCard";
import { NoDataFound } from "../shared/NoDataFound";

const TrendingProduct = async () => {
  const trendingProducts = await getTrendingProducts();
  const session = await auth();
  const user = await getUserByEmail(session?.user?.email);

  return (
    <div className="container pb-16">
      <h2 className="mb-6 text-2xl font-medium text-gray-800 uppercase">
        TRENDING PRODUCTS
      </h2>

      {trendingProducts?.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          {trendingProducts?.map((product) => (
            <ProductCard key={product.id} product={product} userId={user?.id} />
          ))}
        </div>
      ) : (
        <NoDataFound message="No trending product are available!" />
      )}
    </div>
  );
};

export default TrendingProduct;
