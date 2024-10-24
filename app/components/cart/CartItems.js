"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import useCartData from "@/hooks/useCartData";
import LoadingImage from "@/public/svg/loading.svg";
import Image from "next/image";
import { useEffect, useState } from "react";
import { flushSync } from "react-dom";
import CatItemCard from "../card/CatItemCard";
import { DeleteConfirmation } from "../modal/DeleteConfirmation";
import { NoDataFound } from "../shared/NoDataFound";

export default function CartItems({ cartItems }) {
  const [selected, setSelected] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathName = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const { loading } = useCartData();

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
  function handleDelete() {
    setIsOpen(true);
  }
  return (
    <>
      <aside className="col-span-1 md:col-span-3">
        {cartItems?.length > 0 ? (
          <div className="max-w-6xl mx-auto space-y-4">
            <div className="flex items-center justify-between p-4 text-xs uppercase rounded-sm shadow-light-elevated_dark-elevated-dark">
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
                onClick={handleDelete}
                title="Remove all products"
                className="gap-2 cursor-pointer text-secondary flex-start hover:text-primary"
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

      {loading && (
        <div className="absolute z-20 w-screen transform -translate-x-1/2 -translate-y-1/2 cursor-not-allowed opacity-60 bg-secondary-light size-full flex-center inset-1/2">
          <Image src={LoadingImage} width={40} height={40} alt="loading..." />
        </div>
      )}
      <DeleteConfirmation isOpen={isOpen} setIsOpen={setIsOpen} from="all" />
    </>
  );
}
