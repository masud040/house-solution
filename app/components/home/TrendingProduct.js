import { auth } from "@/auth";
import { getTrendingProducts, getUserByEmail } from "@/db/queries";
import ProductCard from "../card/ProductCard";
import { NoDataFound } from "../shared/NoDataFound";
import SectionTitle from "../shared/SectionTitle";

const TrendingProduct = async () => {
  const trendingProducts = await getTrendingProducts();
  const session = await auth();
  const user = await getUserByEmail(session?.user?.email);

  return (
    <div className="mb-14">
      <SectionTitle name="TRENDING PRODUCTS" />

      {trendingProducts?.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 md:gap-6 md:grid-cols-3 lg:grid-cols-4">
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
