"use client";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

export default function CategoryCard({ categoryData }) {
  const pathName = usePathname();
  const { replace } = useRouter();

  return (
    <div
      onClick={() =>
        replace(`${pathName}/shop?category=${categoryData?.value}`)
      }
      className="relative h-64 overflow-hidden rounded-md group"
    >
      <Image
        src={categoryData?.image}
        alt={categoryData?.name}
        fill
        objectFit="cover"
        className="transition-all duration-500 ease-in-out group-hover:scale-105"
      />
      <a
        href="#"
        className="text-white bg-overlay group-hover:bg-opacity-60 flex-center h5-md-h4-medium"
      >
        {categoryData?.name}
      </a>
    </div>
  );
}
