"use client";
import { useState } from "react";
import CartItemCard from "../card/CartItemCard";
import { NoDataFound } from "../shared/NoDataFound";

export default function CartItems({ cartItems }) {
  const [selectAll, setSelectAll] = useState(false);
  function handleChange(e) {
    if (e.target.checked) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  }

  return (
    <aside className="col-span-1 md:col-span-3">
      {cartItems?.length > 0 ? (
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="flex items-center justify-between p-4 font-mono text-sm uppercase rounded-sm shadow-custom">
            <label htmlFor="select-all" className="flex items-center gap-3">
              <input
                type="checkbox"
                onChange={handleChange}
                name="select-all"
                id="select-all"
                className="rounded-sm focus:ring-0"
                checked={selectAll}
              />
              <span>Select All ({cartItems.length}Items)</span>
            </label>
            <div
              title="Remove all products"
              className="flex items-center gap-2 text-gray-500 cursor-pointer hover:text-primary"
            >
              <i className="fa-solid fa-trash"></i>
              <span className="">Delete</span>
            </div>
          </div>
          {cartItems.map((item) => (
            <CartItemCard
              key={item.id}
              product={item}
              selected={selectAll}
              setSelectAll={setSelectAll}
            />
          ))}
        </div>
      ) : (
        <NoDataFound message="There are no items in this cart" cart={true} />
      )}
    </aside>
  );
}
