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
  }, 200);

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
      <h3 className="filter-section-title">Price</h3>
      {error && <div className="text-primary">{error}</div>}
      <div className="items-center mt-4 flex-between">
        <input
          onChange={doSearch}
          type="text"
          name="min"
          id="min"
          className="px-3 py-1.5 rounded input-field flex-1"
          defaultValue={price?.min}
          placeholder="min"
        />
        <span className="mx-2">-</span>
        <input
          onChange={doSearch}
          type="text"
          name="max"
          id="max"
          defaultValue={price?.max}
          className="px-2 py-1.5 rounded input-field flex-1"
          placeholder="max"
        />
      </div>
    </div>
  );
};
