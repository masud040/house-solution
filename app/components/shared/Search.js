"use client";

import { useDebounce } from "@/app/hooks/useDebounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const Search = () => {
  const [search_term, setSearchTerm] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  function handleSearch(e) {
    const searchValue = e.target.value;
    setSearchTerm(searchValue);
  }
  const debounce = useDebounce((e) => {
    handleSearch(e);
  }, 200);

  useEffect(() => {
    if (search_term) {
      params.set("search_term", search_term);
    } else {
      params.delete("search_term");
    }
    router.replace(`${pathname}?${params.toString()}`);
  }, [search_term]);

  useEffect(() => {
    const serachTerm = searchParams.get("search_term");
    if (serachTerm) {
      setSearchTerm(serachTerm);
    }
  }, []);
  return (
    <div className="relative flex w-full max-w-xl">
      <span className="absolute text-lg text-gray-400 left-4 top-3">
        <i className="fa-solid fa-magnifying-glass"></i>
      </span>
      <input
        onChange={(e) => debounce(e)}
        type="text"
        name="search"
        id="search"
        defaultValue={search_term}
        className="w-full py-3 pl-12 pr-3 border border-r-0 border-primary rounded-l-md focus:outline-none"
        placeholder="search"
      />
      <button className="px-8 text-white transition border bg-primary border-primary rounded-r-md hover:bg-transparent hover:text-primary">
        Search
      </button>
    </div>
  );
};
