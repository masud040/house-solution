"use client";

import useMode from "@/app/hooks/useMode";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const FilterByCategory = ({ categories }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const [query, setQuery] = useState([]);
  const { theme } = useMode();

  useEffect(() => {
    let category = decodeURI(searchParams?.get("category")?.toLowerCase());

    const selectedCategory = category
      .split("|")
      .filter((item) => item !== "undefined" && item !== "");
    setQuery(selectedCategory);
  }, [searchParams]);
  function handleChange(e) {
    const name = e.target.name.toLowerCase();
    const checked = e.target.checked;
    if (checked) {
      setQuery((prevQuery) => [...prevQuery, name]);
    } else {
      setQuery((prevQuery) => prevQuery.filter((item) => item !== name));
    }
  }

  useEffect(() => {
    const newParams = new URLSearchParams(searchParams);
    if (query.length > 0) {
      newParams.set("category", encodeURI(query.join("|")));
    } else {
      newParams.delete("category");
    }
    replace(`${pathname}?${newParams.toString()}`);
  }, [query, pathname, replace, searchParams]);

  return (
    <div>
      <h3 className="filter-section-title">Categories</h3>
      <div className="space-y-2">
        {categories?.map((category) => (
          <div key={category.name} className="flex-between">
            <div className="flex items-center gap-2">
              <input
                onChange={(e) => handleChange(e)}
                type="checkbox"
                name={category.name}
                id={category.name.toLowerCase()}
                className="hidden peer"
                checked={query.includes(category?.name?.toLowerCase())}
              />
              <label
                htmlFor={category.name.toLowerCase()}
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
              <p>{category.name}</p>
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
