import { WishlistCard } from "@/app/components/card/WishlistCard";
import Breadcrumb from "@/app/components/shared/Breadcrumb";
import { NoDataFound } from "@/app/components/shared/NoDataFound";
import { auth } from "@/auth";
import { getAllWishlistByEmail } from "@/db/queries";
import { redirect } from "next/navigation";

export default async function WishlistPage() {
  const session = await auth();
  if (!session?.user) {
    return redirect("/login");
  }

  const allCartItems = await getAllWishlistByEmail(session?.user?.email);
  return (
    <section>
      <Breadcrumb name="Wishlist" />
      <div className="container gap-6 pt-4 pb-16">
        {allCartItems?.length > 0 ? (
          <div className="max-w-6xl mx-auto space-y-4">
            {allCartItems.map((product) => (
              <WishlistCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <NoDataFound
            message="There are no items in this wishlist"
            cart={true}
          />
        )}
      </div>
    </section>
  );
}
