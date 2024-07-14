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
    e.preventDefault();
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
      params.set("category", encodeURI(query.join("|")));
    } else {
      params.delete("category");
    }
    replace(`${pathname}?${params.toString()}`);
  }, [query]);

  return (
    <div>
      <h3 className="mb-3 text-xl font-medium text-gray-800 uppercase">
        Categories
      </h3>
      <div className="space-y-2">
        {categories?.map((category) => (
          <div key={category.name} className="flex items-center">
            <input
              onChange={(e) => handleChange(e)}
              type="checkbox"
              name={category.name}
              id={category.name}
              className="rounded-sm cursor-pointer text-primary focus:ring-0"
              defaultChecked={query.includes(category.name.toLowerCase())}
            />
            <label
              htmlFor={category.name}
              className="ml-3 text-gray-600 cusror-pointer"
            >
              {category?.name}
            </label>
            <div className="ml-auto text-sm text-gray-600">
              ({category?.products ? category.products : 0})
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
