"use client";

import { useDebounce } from "@/app/hooks/useDebounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const Search = () => {
  const pathname = usePathname();
  if (pathname !== "/en/shop") {
    return null;
  }
  const [search_term, setSearchTerm] = useState("");
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
    <div className="flex-1 max-w-lg">
      <input
        onChange={(e) => debounce(e)}
        type="search"
        name="search"
        id="search"
        defaultValue={search_term}
        className="px-4 py-2 lg:py-2.5 input-field rounded-xl"
        placeholder="search"
      />
    </div>
  );
};
