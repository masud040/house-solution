"use client";
import { handleMovingWishlistToCart, performDelete } from "@/actions";
import { useState } from "react";
import { toast } from "react-toastify";
import { ConfirmationModal } from "../modal/ConfirmationModal";

const WishlistActionBtn = ({ productId }) => {
  const [isOpen, setIsOpen] = useState(false);
  async function handleDelete() {
    try {
      const response = await performDelete(productId, "wishlist");
      if (response?.status === 200) {
        toast.success(response.message, { autoClose: 1500 });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsOpen(false);
    }
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
          className="cursor-pointer text-background-light"
        >
          <i className="text-xl fa fa-cart-plus"></i>
        </div>
        <div
          onClick={() => setIsOpen(true)}
          title="Remove from cart"
          className="transition-colors duration-300 cursor-pointer text-primary-light hover:text-primary-dark"
        >
          <i className="ext-xl fa-solid fa-trash"></i>
        </div>
      </div>
      <ConfirmationModal
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        actionBtnLabel={"Remove"}
        actionFuction={handleDelete}
        confirmationLabel={"Are you sure want?"}
        confirmationSubLabel={"Items will be remove from your wishlist"}
      ></ConfirmationModal>
    </>
  );
};

export default WishlistActionBtn;
