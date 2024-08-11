"use client";
import { useState } from "react";
import { DeleteConfirmation } from "../modal/DeleteConfirmation";

const WishlistActionBtn = ({ productId }) => {
  console.log(productId);
  const [isOpen, setIsOpen] = useState(false);
  function handleDelete() {
    setIsOpen(true);
  }
  return (
    <>
      <div className="flex items-center gap-8">
        <div title="Move on cart" className="text-gray-600 cursor-pointer">
          <i className="text-xl fa fa-cart-plus"></i>
        </div>
        <div
          onClick={handleDelete}
          title="Remove from cart"
          className="text-gray-600 cursor-pointer hover:text-primary"
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
