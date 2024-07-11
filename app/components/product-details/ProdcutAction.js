"use client";

import { toggleAddToCart } from "@/actions";
import { useRouter } from "next/navigation";

import { useState } from "react";

export const ProdcutAction = ({ product: { id, cart, wishlist }, userId }) => {
  const [quantity, setQuantity] = useState(1);
  const [isAddedToCart, setIsAddedToCart] = useState(cart?.includes(userId));
  const router = useRouter();
  function decreseQuantity() {
    if (quantity > 1) setQuantity((q) => q - 1);
  }
  function increaseQuantity() {
    if (quantity < 5) setQuantity((q) => q + 1);
  }
  async function handleChange() {
    try {
      if (!userId) {
        router.push(`/en/login?product_id=${id}&quantity=${quantity}`);
      } else {
        await toggleAddToCart(id, userId);
        setIsAddedToCart((i) => !i);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="mt-4">
        <h3 className="mb-1 text-sm text-gray-800 uppercase">Quantity</h3>
        <div className="flex text-gray-600 border border-gray-300 divide-x divide-gray-300 w-max">
          <button
            onClick={decreseQuantity}
            disabled={quantity === 1}
            className="flex items-center justify-center w-8 h-8 text-xl cursor-pointer select-none hover:bg-primary hover:text-white disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            -
          </button>
          <div className="flex items-center justify-center w-8 h-8 text-base">
            {quantity}
          </div>
          <button
            onClick={increaseQuantity}
            disabled={quantity === 5}
            className="flex items-center justify-center w-8 h-8 text-xl cursor-pointer select-none hover:bg-primary hover:text-white disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            +
          </button>
        </div>
      </div>

      <div className="flex gap-3 py-4 mt-2 border-b border-gray-200">
        <button
          onClick={handleChange}
          className="flex items-center gap-2 px-8 py-2 font-medium text-white uppercase transition border rounded bg-primary border-primary hover:bg-transparent hover:text-primary"
        >
          <i className="fa-solid fa-bag-shopping"></i>
          {isAddedToCart ? "Remove from cart" : "Add to cart"}
        </button>
        <button className="flex items-center gap-2 px-8 py-2 font-medium text-gray-600 uppercase transition border border-gray-300 rounded hover:text-primary">
          <i className="fa-solid fa-heart"></i> Wishlist
        </button>
      </div>

      <div className="flex gap-3 mt-4">
        <button className="flex items-center justify-center w-8 h-8 text-gray-400 border border-gray-300 rounded-full hover:text-gray-500">
          <i className="fa-brands fa-facebook-f"></i>
        </button>
        <button className="flex items-center justify-center w-8 h-8 text-gray-400 border border-gray-300 rounded-full hover:text-gray-500">
          <i className="fa-brands fa-twitter"></i>
        </button>
        <button className="flex items-center justify-center w-8 h-8 text-gray-400 border border-gray-300 rounded-full hover:text-gray-500">
          <i className="fa-brands fa-instagram"></i>
        </button>
      </div>
    </>
  );
};
