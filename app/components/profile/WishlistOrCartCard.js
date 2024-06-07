import ProductImage from "@/public/assets/images/products/product5.jpg";
import Image from "next/image";
import ActionBtn from "./ActionBtn";

export default function WishlistOrCartCard({ form }) {
  return (
    <div class="flex items-center justify-between gap-6 p-4 border border-gray-200 rounded">
      <div class="w-28">
        <Image
          src={ProductImage}
          width={200}
          height={200}
          alt="product 6"
          class="w-full"
        />
      </div>
      <div class="w-1/3">
        <h2 class="text-xl font-medium text-gray-800 uppercase">
          Italian L shape
        </h2>
        <p class="text-sm text-gray-500">
          Availability: <span class="text-green-600">In Stock</span>
        </p>
      </div>
      <div class="text-lg font-semibold text-primary">$320.00</div>
      <ActionBtn form={form} />

      <div class="text-gray-600 cursor-pointer hover:text-primary">
        <i class="fa-solid fa-trash"></i>
      </div>
    </div>
  );
}
