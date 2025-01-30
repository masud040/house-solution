"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const FilterByCategory = ({ categories }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);
  const [query, setQuery] = useState([]);

  function handleChange(e) {
    const name = e.target.name;
    const checked = e.target.checked;
    if (checked) {
      setQuery([...query, name.toLowerCase()]);
    } else {
      const filtered = query.filter((item) => item !== name.toLowerCase());

      setQuery(filtered);
    }
  }

  useEffect(() => {
    let category = decodeURI(searchParams?.get("category")?.toLowerCase());
    const selectedCategory = category.split("|");
    setQuery(selectedCategory);
  }, []);
  useEffect(() => {
    if (query.length > 0) {
      params.set(
        "category",
        encodeURI(query.filter((item) => item !== "undefined").join("|"))
      );
    } else {
      params.delete("category");
    }
    replace(`${pathname}?${params.toString()}`);
  }, [query, pathname, replace]);

  return (
    <div>
      <h3 className="filter-section-title">Categories</h3>
      <div className="space-y-2">
        {categories?.map((category) => (
          <div key={category.name} className="flex-between">
            <div className="gap-2 flex-start">
              <input
                onChange={(e) => handleChange(e)}
                type="checkbox"
                name={category.name}
                id={category.name}
                className="rounded-sm cursor-pointer text-primary focus:ring-0"
                checked={query.includes(category?.name?.toLowerCase())}
              />
              <label
                htmlFor={category.name}
                className="font-medium cusror-pointer"
              >
                {category?.name}
              </label>
            </div>
            <div className="text-sm font-semibold">
              ({category?.products ? category.products : 0})
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
