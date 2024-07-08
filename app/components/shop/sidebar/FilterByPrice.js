"use client";
import { useDebounce } from "@/app/hooks/useDebounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const FilterByPrice = () => {
  const [price, setPrice] = useState({});
  const [error, setError] = useState("");
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const { replace } = useRouter();
  function handleFilter(e) {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    if (parseFloat(value) || value === "") {
      setPrice({ ...price, [name]: value });
      setError("");
    } else {
      setError("Invalid price");
    }
  }

  const doSearch = useDebounce((e) => {
    handleFilter(e);
  }, 500);

  useEffect(() => {
    if (price.min) {
      params.set("min_price", price.min);
    } else {
      params.delete("min_price");
    }
    if (price.max) {
      params.set("max_price", price.max);
    } else {
      params.delete("max_price");
    }

    replace(`${pathname}?${params.toString()}`);
  }, [price]);
  useEffect(() => {
    const selectedMinPrice = searchParams.get("min_price");
    const selectedMaxPrice = searchParams.get("max_price");
    setPrice({ min: selectedMinPrice, max: selectedMaxPrice });
  }, []);
  return (
    <div className="pt-4">
      <h3 className="mb-3 text-xl font-medium text-gray-800 uppercase">
        Price
      </h3>
      {error && <div className="text-red-500">{error}</div>}
      <div className="flex items-center mt-4">
        <input
          onChange={doSearch}
          type="text"
          name="min"
          id="min"
          className="w-full px-3 py-1 text-gray-600 border-gray-300 rounded shadow-sm focus:border-primary focus:ring-0"
          defaultValue={price?.min}
          placeholder="min"
        />
        <span className="mx-3 text-gray-500">-</span>
        <input
          onChange={doSearch}
          type="text"
          name="max"
          id="max"
          defaultValue={price?.max}
          className="w-full px-3 py-1 text-gray-600 border-gray-300 rounded shadow-sm focus:border-primary focus:ring-0"
          placeholder="max"
        />
      </div>
    </div>
  );
};
