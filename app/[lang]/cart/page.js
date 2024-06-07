import Breadcrumb from "@/app/components/profile/Breadcrumb";
import WishlistOrCartCard from "@/app/components/profile/WishlistOrCartCard";

export default function CartPage() {
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
