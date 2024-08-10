"use client";
import { updateProductQuantity } from "@/actions";
import useCartData from "@/hooks/useCartData";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { CartOrWishItemDeleteModal } from "../modal/CartOrWishItemDeleteModal";

export default function CatItemCard({
  product,
  selectedProduct,
  setSelectedProduct,
  handleChange,
}) {
  const {
    id,
    name,
    price,
    thumbnail,
    stock,
    quantity: productQuantity,
    userId,
    discount,
    selected,
  } = product || {};

  const [quantity, setQuantity] = useState(productQuantity);
  const { loading, setLoading } = useCartData();
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  async function increaseDecreaseQuantity(type) {
    try {
      setLoading(true);
      if (type === "increase") {
        if (quantity < 5) setQuantity((q) => q + 1);
        const response = await updateProductQuantity(id, userId, type);
        if (response?.status === 200) {
          setLoading(false);
        }
      } else if (type === "decrease") {
        if (quantity > 1) setQuantity((q) => q - 1);
        const response = await updateProductQuantity(id, userId, type);
        if (response?.status === 200) {
          setLoading(false);
        }
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }
  async function deleteCartItem() {
    setIsOpen(true);
  }

  const discountedPrice = price - (price * discount) / 100;
  return (
    <>
      <div className="flex items-center justify-between gap-4 p-4 rounded-sm shadow-custom">
        <label htmlFor={id}>
          <input
            type="checkbox"
            onChange={(e) => handleChange(e, id)}
            name={id}
            className="rounded-sm focus:ring-0"
            id={id}
            checked={selectedProduct?.includes(id)}
          />
        </label>

        <div className="w-28">
          <Image
            src={thumbnail}
            width={200}
            height={200}
            alt="product 6"
            className="w-full"
          />
        </div>
        <div className="w-1/3">
          <h2 className="text-sm text-gray-800 md:text-lg">{name}</h2>
          <p className="text-xs text-gray-500">
            Availability:{" "}
            {stock > 0 ? (
              <span className="text-green-600">In Stock</span>
            ) : (
              <span className="text-red-600">Out Of Stock</span>
            )}
          </p>
        </div>

        <div className="flex flex-col items-center gap-3 md:flex-row">
          <div className="space-x-2 text-primary">
            <span>{discountedPrice?.toFixed(2)}</span>
            <span className="text-sm text-gray-700 line-through">{price}</span>
            <span className="text-sm text-gray-700">{discount}%</span>
          </div>

          <div className="flex text-gray-600 border border-gray-300 divide-x divide-gray-300 w-max">
            <button
              onClick={() => increaseDecreaseQuantity("decrease")}
              disabled={quantity === 1}
              className="flex items-center justify-center text-xl cursor-pointer select-none w-7 h-7 hover:bg-primary hover:text-white disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              -
            </button>
            <div className="flex items-center justify-center text-base w-7 h-7">
              {quantity}
            </div>
            <button
              onClick={() => increaseDecreaseQuantity("increase")}
              disabled={quantity === 5}
              className="flex items-center justify-center text-xl cursor-pointer select-none w-7 h-7 hover:bg-primary hover:text-white disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              +
            </button>
          </div>
        </div>

        <div
          onClick={deleteCartItem}
          title="Remove from cart"
          className="text-gray-600 transition-all duration-300 cursor-pointer hover:text-primary"
        >
          <i className="fa-solid fa-trash"></i>
        </div>
      </div>
      <CartOrWishItemDeleteModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
