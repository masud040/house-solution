"use client";

import { addToCart, performAddWishlist } from "@/actions";
import { useRouter } from "next/navigation";

import { useState } from "react";
import { toast } from "react-toastify";

export const ProdcutAction = ({ product: { id, cart, wishlist }, userId }) => {
  const [quantity, setQuantity] = useState(1);

  const router = useRouter();
  function decreseQuantity() {
    if (quantity > 1) setQuantity((q) => q - 1);
  }
  function increaseQuantity() {
    if (quantity < 5) setQuantity((q) => q + 1);
  }
  // handle add to cart
  async function handleAddToCart() {
    try {
      if (!userId) {
        toast.warning("Please Login.", { autoClose: 2000 });
        router.push(`/en/login?product_id=${id}&quantity=${quantity}`);
      } else {
        const response = await addToCart(id, userId, quantity);
        if (response?.status === 200) {
          toast.success(response.message, { autoClose: 2000 });
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  // handle wishlist
  async function handleAddToWishlist() {
    try {
      if (!userId) {
        router.push(`/en/login?product_id=${id}&quantity=${quantity}`);
      } else {
        await performAddWishlist(id, userId);
        toast.success("Update wishlist", { autoClose: 2000 });
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

      <div className="flex gap-3 py-4 mt-2 text-sm border-b border-gray-200">
        <button className="flex items-center gap-2 px-8 py-2 font-medium text-white text-gray-600 uppercase transition border border-gray-300 rounded bg-secondary/70 hover:bg-white hover:text-primary">
          Buy Now
        </button>
        <button
          onClick={handleAddToCart}
          className="flex items-center gap-2 px-8 py-2 font-medium text-white uppercase transition border rounded bg-primary border-primary hover:bg-transparent hover:text-primary"
        >
          <i className="fa-solid fa-bag-shopping"></i>
          Add to cart
        </button>
      </div>

      <div className="flex gap-3 mt-4">
        <button className="flex items-center justify-center w-8 h-8 text-gray-400 border border-gray-300 rounded-full hover:text-gray-500">
          <i className="fa-solid fa-share"></i>
        </button>
        <button
          onClick={handleAddToWishlist}
          className={`flex items-center justify-center w-8 h-8 text-gray-400 border border-gray-300 rounded-full hover:text-gray-500 ${
            wishlist?.includes(userId) && "bg-primary text-white"
          }`}
        >
          <i className="fa-regular fa-heart"></i>
        </button>
      </div>
    </>
  );
};
