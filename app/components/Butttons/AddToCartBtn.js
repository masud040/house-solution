"use client";

import { addToCart } from "@/actions";
import { useRouter } from "next/navigation";

import { toast } from "react-toastify";

export default function AddToCartBtn({ productId, userId }) {
  const router = useRouter();
  async function handleAddToCart(e) {
    try {
      e.preventDefault();
      e.stopPropagation();
      if (!userId) {
        toast.warning("Please login.", { autoClose: 1500 });
        router.push(`/en/login?product_id=${productId}&quantity=${1}`);
      } else {
        const response = await addToCart(productId, userId, 1);
        if (response?.status === 200) {
          toast.success(response.message, { autoClose: 1500 });
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <button
      onClick={handleAddToCart}
      className="py-3 btn-shadow-with-hover-effect text-primary "
    >
      Add to cart
    </button>
  );
}
