"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function FilterBySize() {
  const [size, setSize] = useState({});
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);
  function handleChange(e) {
    const newSize = e.target.name;
    if (size?.size === newSize) {
      setSize("");
    } else {
      setSize({ size: newSize });
    }
  }

  useEffect(() => {
    if (size) {
      params.set("size", size?.size);
    } else {
      params.delete("size");
    }
    replace(`${pathname}?${params.toString()}`);
  }, [size]);
  useEffect(() => {
    const size = searchParams.get("size");
    if (size) {
      setSize({ size: size });
    }
  }, []);
  return (
    <div className="pt-4">
      <h3 className="filter-section-title">size</h3>
      <div className="flex items-center gap-2">
        <div className="size-selector">
          <input
            onClick={handleChange}
            type="radio"
            name="size-xs"
            id="size-xs"
            className="sr-only"
            checked={searchParams.get("size") === "size-xs"}
          />
          <label htmlFor="size-xs" className="filter-by-size">
            XS
          </label>
        </div>
        <div className="size-selector">
          <input
            onClick={handleChange}
            type="radio"
            name="size-sm"
            id="size-sm"
            className="sr-only"
            checked={searchParams.get("size") === "size-sm"}
          />
          <label htmlFor="size-sm" className="filter-by-size">
            S
          </label>
        </div>
        <div className="size-selector">
          <input
            onClick={handleChange}
            type="radio"
            name="size-m"
            id="size-m"
            className="sr-only"
            checked={searchParams.get("size") === "size-m"}
          />
          <label htmlFor="size-m" className="filter-by-size">
            M
          </label>
        </div>
        <div className="size-selector">
          <input
            onClick={handleChange}
            type="radio"
            name="size-l"
            id="size-l"
            className="sr-only"
            checked={searchParams.get("size") === "size-l"}
          />
          <label htmlFor="size-l" className="filter-by-size">
            L
          </label>
        </div>
        <div className="size-selector">
          <input
            onClick={handleChange}
            type="radio"
            name="size-xl"
            id="size-xl"
            className="sr-only"
            checked={searchParams.get("size") === "size-xl"}
          />
          <label htmlFor="size-xl" className="filter-by-size">
            XL
          </label>
        </div>
      </div>
    </div>
  );
}
