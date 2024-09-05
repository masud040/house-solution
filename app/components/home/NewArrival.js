import { auth } from "@/auth";
import { getNewArrivalProducts, getUserByEmail } from "@/db/queries";
import ProductCard from "../card/ProductCard";
import { NoDataFound } from "../shared/NoDataFound";
import SectionTitle from "../shared/SectionTitle";

export default async function NewArrival() {
  const newProducts = await getNewArrivalProducts();
  const session = await auth();
  const user = await getUserByEmail(session?.user?.email);

  return (
    <div className="mb-14">
      <SectionTitle name="top new arrival" />

      {newProducts?.length > 0 ? (
        <div className="grid grid-cols-2 gap-6 md:gap-8 md:grid-cols-3 lg:grid-cols-4">
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
