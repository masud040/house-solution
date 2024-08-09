import { auth } from "@/auth";
import { getNewArrivalProducts, getUserByEmail } from "@/db/queries";
import ProductCard from "../card/ProductCard";
import { NoDataFound } from "../shared/NoDataFound";

export default async function NewArrival() {
  const newProducts = await getNewArrivalProducts();
  const session = await auth();
  const user = await getUserByEmail(session?.user?.email);

  return (
    <div className="container pb-16">
      <h2 className="mb-6 text-2xl font-medium text-gray-800 uppercase">
        top new arrival
      </h2>

      {newProducts?.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          {newProducts?.map((product) => (
            <ProductCard key={product.id} product={product} userId={user?.id} />
          ))}
        </div>
      ) : (
        <NoDataFound message=" No New Arrival Product!" />
      )}
    </div>
  );
}
