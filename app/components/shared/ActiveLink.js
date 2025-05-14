"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function ActiveLink({ name, path, profile, small }) {
  const pathname = usePathname();
  const slicePath = pathname.slice(3);

  return (
    <Link
      href={path}
      className={`${
        slicePath === path || pathname === path
          ? "text-primary-light  hover:text-primary"
          : "text-secondary dark:text-tertiary"
      } nav-link ${profile && "font-bold text-lg"} ${small && "text-sm"}`}
    >
      {name}
    </Link>
  );
}
