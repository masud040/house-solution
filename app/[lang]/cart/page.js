import Breadcrumb from "@/app/components/profile/Breadcrumb";
import WishlistOrCartCard from "@/app/components/profile/WishlistOrCartCard";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function CartPage() {
  const session = await auth();
  if (!session?.user) {
    return redirect("/login");
  }
  return (
    <>
      <Breadcrumb />
      <div class="container gap-6 pt-4 pb-16">
        <div class="max-w-6xl mx-auto space-y-4">
          <WishlistOrCartCard form="cart" />
        </div>
      </div>
    </>
  );
}
