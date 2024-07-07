import { getNewArrivalProducts } from "@/db/queries";
import ProductCard from "../card/ProductCard";

export default async function NewArrival() {
  const newProducts = await getNewArrivalProducts();

  return (
    <div className="container pb-16">
      <h2 className="mb-6 text-2xl font-medium text-gray-800 uppercase">
        top new arrival
      </h2>

      {newProducts?.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          {newProducts?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-20 font-medium text-indigo-500">
          No New Arrival Product!
        </div>
      )}
    </div>
  );
}
