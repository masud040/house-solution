"use client";
import { handleMovingWishlistToCart } from "@/actions";
import { useState } from "react";
import { toast } from "react-toastify";
import { DeleteConfirmation } from "../modal/DeleteConfirmation";

const WishlistActionBtn = ({ productId }) => {
  const [isOpen, setIsOpen] = useState(false);
  function handleDelete() {
    setIsOpen(true);
  }
  async function handleMove() {
    try {
      const response = await handleMovingWishlistToCart(productId);
      if (response.status === 200) {
        toast.success(response.message, { autoClose: 1500 });
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className="gap-8 flex-start">
        <div
          onClick={handleMove}
          title="Move on cart"
          className="cursor-pointer text-secondary-dark"
        >
          <i className="text-xl fa fa-cart-plus"></i>
        </div>
        <div
          onClick={handleDelete}
          title="Remove from cart"
          className="cursor-pointer text-secondary-dark hover:text-primary"
        >
          <i className="ext-xl fa-solid fa-trash"></i>
        </div>
      </div>
      <DeleteConfirmation
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        productId={productId}
        from="wishlist"
      />
    </>
  );
};

export default WishlistActionBtn;
