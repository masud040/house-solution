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
      className="block w-full py-1 text-center text-white transition border rounded-b bg-primary border-primary hover:bg-transparent hover:text-primary"
    >
      Add to cart
    </button>
  );
}
