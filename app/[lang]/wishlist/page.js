import Breadcrumb from "@/app/components/profile/Breadcrumb";
import WishlistOrCartCard from "@/app/components/profile/WishlistOrCartCard";

export default function WishlistPage() {
  return (
    <>
      <Breadcrumb />
      <div class="container gap-6 pt-4 pb-16">
        <div class="max-w-6xl mx-auto space-y-4">
          <WishlistOrCartCard form="wishlist" />
        </div>
      </div>
    </>
  );
}
