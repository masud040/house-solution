"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useEffect, useState } from "react";
import { flushSync } from "react-dom";
import CatItemCard from "../card/CatItemCard";
import { NoDataFound } from "../shared/NoDataFound";

export default function CartItems({ cartItems }) {
  const [selected, setSelected] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const pathName = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  function handleChange(e) {
    const name = e.target.name;
    const checked = e.target.checked;
    if (checked) {
      if (name === "all") {
        setSelectAll(true);
        setSelected(cartItems.map((i) => i.id.toString()));
      } else {
        setSelected((prevSelected) => [...prevSelected, name]);
      }
    } else {
      if (name === "all") {
        setSelectAll(false);
        setSelected([]);
      } else {
        setSelectAll(false);
        setSelected((prevSelected) =>
          prevSelected.filter((item) => item !== name)
        );
      }
    }
  }
  useEffect(() => {
    if (selected.length > 0) {
      params.set("selected", selected.join(","));
    } else {
      params.delete("selected");
    }
    router.replace(`${pathName}?${params.toString()}`);
  }, [selected]);

  useEffect(() => {
    const selectedProduct = searchParams.get("selected")?.split(",");
    if (selectedProduct?.length > 0) {
      flushSync(() => {
        setSelected(selectedProduct);
      });
      if (selectedProduct?.length === cartItems?.length) {
        setSelectAll(true);
      }
    }
  }, []);

  return (
    <aside className="col-span-1 md:col-span-3">
      {cartItems?.length > 0 ? (
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="flex items-center justify-between p-4 text-xs uppercase rounded-sm shadow-custom">
            <label htmlFor="all" className="flex items-center gap-3">
              <input
                type="checkbox"
                onChange={handleChange}
                name="all"
                id="all"
                className="rounded-sm focus:ring-0"
                checked={selectAll}
              />
              <span>Select All ({cartItems.length} Items)</span>
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
            <CatItemCard
              key={item.id}
              product={item}
              selectedProduct={selected}
              setSelectedProduct={setSelected}
              handleChange={handleChange}
            />
          ))}
        </div>
      ) : (
        <NoDataFound message="There are no items in this cart" cart={true} />
      )}
    </aside>
  );
}
