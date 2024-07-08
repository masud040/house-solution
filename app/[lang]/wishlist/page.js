import Breadcrumb from "@/app/components/profile/Breadcrumb";
import WishlistOrCartCard from "@/app/components/profile/WishlistOrCartCard";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function WishlistPage() {
  const session = await auth();
  if (!session?.user) {
    return redirect("/login");
  }
  return (
    <>
      <Breadcrumb />
      <div className="container gap-6 pt-4 pb-16">
        <div className="max-w-6xl mx-auto space-y-4">
          <WishlistOrCartCard form="wishlist" />
        </div>
      </div>
    </>
  );
}
