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
    if (!parseInt(searchValue)) {
      setSearchTerm(searchValue);
    }
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
    <div className="flex-1 max-w-xl mx-8">
      <input
        onChange={(e) => debounce(e)}
        type="search"
        name="search"
        id="search"
        defaultValue={search_term}
        className="w-full px-5 py-2.5 text-secondary border-indigo-400 rounded-2xl focus:outline-none focus:border-indigo-500 transition duration-500"
        placeholder="search"
      />
    </div>
  );
};
