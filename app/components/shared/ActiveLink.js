"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function ActiveLink({ name, path }) {
  const pathname = usePathname();
  const slicePath = pathname.slice(3);

  return (
    <Link
      href={path}
      className={`${
        slicePath === path || pathname === path
          ? "text-indigo-500 transition hover:text-indigo-600"
          : "text-gray-200 transition hover:text-white"
      }`}
    >
      {name}
    </Link>
  );
}
