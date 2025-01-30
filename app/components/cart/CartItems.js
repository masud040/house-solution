"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { performDelete } from "@/actions";
import useCartData from "@/hooks/useCartData";
import LoadingImage from "@/public/svg/loading.svg";
import Image from "next/image";
import { useEffect, useState } from "react";
import { flushSync } from "react-dom";
import CatItemCard from "../card/CatItemCard";
import { ConfirmationModal } from "../modal/ConfirmationModal";
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
  }, [selected, params, pathName]);

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
  }, [cartItems?.length, searchParams]);
  async function handleDelete() {
    try {
      const response = await performDelete("all", "all");
      if (response?.status === 200) {
        toast.success(response.message, { autoClose: 1500 });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsOpen(false);
    }
  }
  return (
    <>
      <aside className="col-span-1 md:col-span-3">
        {cartItems?.length > 0 ? (
          <div className="max-w-6xl mx-auto space-y-4">
            <div className="flex items-center justify-between p-4 text-xs uppercase rounded-md shadow-light-elevated_dark-elevated-dark">
              <div className="gap-2 flex-start">
                <input
                  type="checkbox"
                  className="hidden peer"
                  onChange={handleChange}
                  name="all"
                  id="all"
                  checked={selectAll}
                />
                <label
                  htmlFor="all"
                  className="flex items-center justify-center w-5 h-5 border-2 rounded-md cursor-pointer border-primary peer-checked:bg-primary peer-checked:border-primary peer-focus:ring-2 peer-focus:ring-offset-2 peer-focus:ring-primary"
                >
                  {/* Check Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 text-white peer-checked:block"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </label>
                <span>Select All ({cartItems.length} Items)</span>
              </div>

              <div
                onClick={() => setIsOpen(true)}
                title="Remove all products"
                className="gap-2 cursor-pointer flex-start hover:text-primary"
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
      <ConfirmationModal
        isOpen={isOpen}
        setIsOpen={() => setIsOpen(false)}
        actionBtnLabel={"Remove"}
        actionFuction={handleDelete}
        confirmationLabel={"Are you sure want?"}
        confirmationSubLabel={"All items will be remove from your cart"}
      >
        <div>Hello I am from Modal</div>
      </ConfirmationModal>
    </>
  );
}
