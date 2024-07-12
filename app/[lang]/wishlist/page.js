import CartItemCard from "@/app/components/card/CartItemCard";
import Breadcrumb from "@/app/components/shared/Breadcrumb";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function WishlistPage() {
  const session = await auth();
  if (!session?.user) {
    return redirect("/login");
  }
  return (
    <section>
      <Breadcrumb name="Wishlist" />
      <div className="container gap-6 pt-4 pb-16">
        <div className="max-w-6xl mx-auto space-y-4">
          <CartItemCard form="wishlist" />
        </div>
      </div>
    </section>
  );
}
