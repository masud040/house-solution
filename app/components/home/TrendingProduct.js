import { getTrendingProducts } from "@/db/queries";
import ProductCard from "../card/ProductCard";

const TrendingProduct = async () => {
  const trendingProducts = await getTrendingProducts();

  return (
    <div className="container pb-16">
      <h2 className="mb-6 text-2xl font-medium text-gray-800 uppercase">
        TRENDING PRODUCTS
      </h2>

      {trendingProducts?.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          {trendingProducts?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-20 font-medium text-indigo-500">
          No trending product are available!
        </div>
      )}
    </div>
  );
};

export default TrendingProduct;
