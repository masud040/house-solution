"use client";
import { performDelete, updateProductQuantity } from "@/actions";
import useMode from "@/app/hooks/useMode";
import useCartData from "@/hooks/useCartData";
import Image from "next/image";
import { useState } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";
import { toast } from "react-toastify";
import { ConfirmationModal } from "../modal/ConfirmationModal";

export default function CatItemCard({
  product,
  selectedProduct,
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
  } = product || {};

  const [quantity, setQuantity] = useState(productQuantity);
  const { loading, setLoading } = useCartData();
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useMode();

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
  async function handleDelete() {
    try {
      const response = await performDelete(id, "cart");
      if (response?.status === 200) {
        toast.success(response.message, { autoClose: 1500 });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsOpen(false);
    }
  }

  const discountedPrice = Math.floor(price - (price * discount) / 100);
  return (
    <>
      <div className="gap-3 px-4 py-5 overflow-hidden rounded-md md:gap-4 flex-center shadow-light-elevated_dark-elevated-dark">
        <div className="gap-2 flex-start">
          <input
            type="checkbox"
            id={id}
            className="hidden peer"
            onChange={(e) => handleChange(e, id)}
            name={id}
            checked={selectedProduct?.includes(id)}
          />

          {/* Custom Label */}
          <label
            htmlFor={id}
            className="flex items-center justify-center w-5 h-5 border-2 rounded-md cursor-pointer border-primary peer-checked:bg-primary peer-checked:border-primary peer-focus:ring-2 peer-focus:ring-offset-2 peer-focus:ring-primary"
          >
            {/* Check Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 text-white peer-checked:block"
              viewBox="0 0 20 20"
              fill={theme === "dark" ? "#212428" : "currentColor"}
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
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
            <h2 className="paragraph-lg-base text-secondary-darker dark:text-background-light">
              {name}
            </h2>
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
            <div className="flex flex-row items-start justify-start w-full gap-2 md:flex-col ">
              <p className="text-sm text-primary">{discountedPrice}</p>

              <p className="text-sm line-through text-secondary-darker dark:text-background-light">
                {Math.floor(price)}
              </p>
              <p className="hidden text-sm text-secondary-darker md:block dark:text-background-light">
                {discount}%
              </p>
            </div>

            <div className="flex divide-x-light-default-dark-tertiary border-light-default_dark-tertiary rounded-3xl w-max">
              <button
                onClick={() => increaseDecreaseQuantity("decrease")}
                disabled={quantity === 1}
                className="quantity-icrease-decrease-btn size-6 md:size-7 rounded-l-3xl"
              >
                <FiMinus />
              </button>
              <div className="text-base flex-center size-6 md:size-7">
                {quantity}
              </div>
              <button
                onClick={() => increaseDecreaseQuantity("increase")}
                disabled={quantity === 5}
                className="quantity-icrease-decrease-btn size-6 md:size-7 rounded-r-3xl"
              >
                <FiPlus />
              </button>
            </div>
            <div
              onClick={() => setIsOpen(true)}
              title="Remove from cart"
              className="transition-all duration-300 cursor-pointer hover:text-primary"
            >
              <i className="fa-solid fa-trash"></i>
            </div>
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={isOpen}
        closeModal={() => setIsOpenModal(false)}
        actionBtnLabel={"Remove"}
        actionFuction={handleDelete}
        confirmationLabel={"Are you sure want?"}
        confirmationSubLabel={"Items will be remove from your cart"}
      ></ConfirmationModal>
    </>
  );
}
