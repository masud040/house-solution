"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
export default function Pagination({ total, page, pages }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const params = new URLSearchParams(searchParams);
  const [pageNo, setPageNo] = useState(pages);
  const numberOfPages = [...Array(pages).keys()];
  const handlePrev = () => {
    if (pageNo > 1) {
      setPageNo(pageNo - 1);
    }
  };
  const handleNext = () => {
    if (pageNo < pages) {
      setPageNo(pageNo + 1);
    }
  };
  useEffect(() => {
    if (pageNo) {
      params.set("page", pageNo);
    }
    router.replace(`${pathname}?${params.toString()}`);
  }, [pageNo]);
  useEffect(() => {
    if (page) {
      setPageNo(searchParams.get("page"));
    }
  }, []);

  return (
    <div className="gap-3 py-10 flex-center">
      <p className="text-sm">
        Page {page} of {pages}
      </p>
      <div className="gap-2 flex-center">
        <button
          disabled={pageNo === 1}
          className="paigination-button"
          onClick={handlePrev}
        >
          <FaAngleLeft className="text-lg" />
        </button>
        {numberOfPages.map((p) => (
          <button
            key={p}
            onClick={() => {
              setPageNo(p + 1);
            }}
            className={`paigination-button ${
              pageNo === p + 1 && "active-paigination-button"
            }`}
          >
            {p + 1}
          </button>
        ))}
        <button
          disabled={pageNo === pages}
          className="paigination-button"
          onClick={handleNext}
        >
          <FaAngleRight className="text-lg" />
        </button>
      </div>
    </div>
  );
}
