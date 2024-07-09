import WishlistOrCartCard from "@/app/components/profile/WishlistOrCartCard";
import Breadcrumb from "@/app/components/shared/Breadcrumb";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function CartPage() {
  const session = await auth();
  if (!session?.user) {
    return redirect("/login");
  }
  return (
    <section>
      <Breadcrumb name="Cart" />
      <div className="container gap-6 pt-4 pb-16">
        <div className="max-w-6xl mx-auto space-y-4">
          <WishlistOrCartCard form="cart" />
        </div>
      </div>
    </section>
  );
}
