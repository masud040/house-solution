"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Logo() {
  const pathname = usePathname();
  const [width, setWidth] = useState(null);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Link href="/">
      <h1
        className={`font-bold text-transparent h6-md-h5-lg-h4 bg-gradient-to-r from-primary-dark to-purple-800 bg-clip-text ${
          pathname === "/en/shop" && width < 640 ? "hidden" : "inline"
        }`}
      >
        Sokher Corner
      </h1>
    </Link>
  );
}
