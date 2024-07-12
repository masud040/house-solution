"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function CartItemCard({ product, selected, setSelectAll }) {
  const {
    _id,
    name,
    price,
    thumbnail,
    stock,
    quantity: productQuantity,
    userId,
  } = product || {};
  const [quantity, setQuantity] = useState(1);
  const [checked, setChecked] = useState(selected);

  useEffect(() => {
    setChecked(selected);
  }, [selected]);

  function decreseQuantity() {
    if (quantity > 1) setQuantity((q) => q - 1);
  }
  function increaseQuantity() {
    if (quantity < 5) setQuantity((q) => q + 1);
  }
  function handleChange(e) {
    if (e.target.checked) {
      setChecked(true);
    } else {
      setSelectAll(false);
      setChecked(false);
    }
  }
  return (
    <div className="flex items-center justify-between gap-4 p-4 rounded-sm shadow-custom">
      <label htmlFor="cart-item">
        <input
          onChange={handleChange}
          type="checkbox"
          name="cart-item"
          className="rounded-sm focus:ring-0"
          id="cart-item"
          checked={checked}
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
        <h2 className="text-lg font-medium text-gray-800 uppercase">{name}</h2>
        <p className="text-sm text-gray-500">
          Availability: <span className="text-green-600">In Stock</span>
        </p>
      </div>
      <div className="text-lg font-semibold text-primary">$320.00</div>
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
      <div
        title="Remove from cart"
        className="text-gray-600 cursor-pointer hover:text-primary"
      >
        <i className="fa-solid fa-trash"></i>
      </div>
    </div>
  );
}
