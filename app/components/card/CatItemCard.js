"use client";
import { updateProductQuantity } from "@/actions";
import useCartData from "@/hooks/useCartData";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { DeleteConfirmation } from "../modal/DeleteConfirmation";

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
  function handleDelete() {
    setIsOpen(true);
  }

  const discountedPrice = price - (price * discount) / 100;
  return (
    <>
      <div className="gap-3 px-4 py-5 overflow-hidden rounded-md md:gap-4 flex-center shadow-light-elevated_dark-elevated-dark">
        <div className="gap-3 flex-start">
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

          <div className="relative w-24">
            <Image
              src={thumbnail}
              width={200}
              height={200}
              alt={name}
              className="object-cover w-full rounded-sm h-14"
            />
          </div>
        </div>
        <div className="flex-col flex-1 gap-2 flex-between md:gap-4 md:flex-row">
          <div className="w-full">
            <h2 className="paragraph-lg-base text-secondary-darker">{name}</h2>
            <p className="text-xs font-medium">
              Availability:{" "}
              {stock > 0 ? (
                <span className="text-green-600">In Stock</span>
              ) : (
                <span className="text-primary">Out Of Stock</span>
              )}
            </p>
          </div>

          <div className="flex-row w-full gap-2 md:gap-4 flex-end">
            <div className="items-start justify-start text-primary flex-column">
              <p className="text-sm">{discountedPrice?.toFixed(2)}</p>

              <p className="text-sm line-through text-secondary-darker">
                {price}
              </p>
              <p className="text-sm text-secondary-darker">{discount}%</p>
            </div>

            <div className="flex divide-x-light-default-dark-secondary text-secondary-dark border-light-default_dark-tertiary w-max">
              <button
                onClick={() => increaseDecreaseQuantity("decrease")}
                disabled={quantity === 1}
                className="quantity-icrease-decrease-btn size-6 md:size-7"
              >
                -
              </button>
              <div className="text-base flex-center size-6 md:size-7">
                {quantity}
              </div>
              <button
                onClick={() => increaseDecreaseQuantity("increase")}
                disabled={quantity === 5}
                className="quantity-icrease-decrease-btn size-6 md:size-7"
              >
                +
              </button>
            </div>
            <div
              onClick={handleDelete}
              title="Remove from cart"
              className="transition-all duration-300 cursor-pointer text-secondary-dark hover:text-primary"
            >
              <i className="fa-solid fa-trash"></i>
            </div>
          </div>
        </div>
      </div>
      <DeleteConfirmation
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        productId={id}
        from="cart"
      />
    </>
  );
}
