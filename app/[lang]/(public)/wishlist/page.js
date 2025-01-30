import Breadcrumb from "@/app/components/shared/Breadcrumb";
import { WishlistCard } from "@/app/components/shared/card/WishlistCard";
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
    <section className="container pt-10 pb-16">
      <Breadcrumb name1="Wishlist" />
      <div className="gap-6">
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
