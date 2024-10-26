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
        toast.warning("Please Login.", { autoClose: 1500 });
        router.push(`/en/login?product_id=${id}&quantity=${quantity}`);
      } else {
        const response = await addToCart(id, userId, quantity);
        if (response?.status === 200) {
          toast.success(response.message, { autoClose: 1500 });
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
        toast.success("Update wishlist", { autoClose: 1500 });
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="mt-4">
        <h3 className="mb-1 text-sm font-medium uppercase text-secondary-darker">
          Quantity
        </h3>
        <div className="flex border divide-x border-secondary-lighter divide-secondary-lighter text-secondary-dark w-max">
          <button
            onClick={decreseQuantity}
            disabled={quantity === 1}
            className="quantity-icrease-decrease-btn size-8"
          >
            -
          </button>
          <div className="text-base flex-center size-8">{quantity}</div>
          <button
            onClick={increaseQuantity}
            disabled={quantity === 5}
            className="quantity-icrease-decrease-btn size-8"
          >
            +
          </button>
        </div>
      </div>

      <div className="gap-6 py-4 mt-2 text-sm border-b-light-default_dark-tertiary flex-start ">
        <button className="gap-2 px-8 py-4 uppercase btn-shadow-with-hover-effect text-primary flex-start">
          Buy Now
        </button>
        <button
          onClick={handleAddToCart}
          className="gap-2 px-8 py-4 uppercase btn-shadow-with-hover-effect text-primary flex-start"
        >
          <i className="fa-solid fa-bag-shopping"></i>
          Add to cart
        </button>
      </div>

      <div className="flex gap-3 mt-4">
        <button className="rounded-full text-secondary-light border-light-default_dark-tertiary size-8 flex-center hover:text-secondary">
          <i className="fa-solid fa-share"></i>
        </button>
        <button
          onClick={handleAddToWishlist}
          className={`rounded-full text-secondary-light border-light-default_dark-tertiary size-8 flex-center hover:text-secondary ${
            wishlist?.includes(userId) &&
            "bg-secondary-dark text-background-light hover:text-secondary-lightest"
          }`}
        >
          <i className="fa-regular fa-heart"></i>
        </button>
      </div>
    </>
  );
};
