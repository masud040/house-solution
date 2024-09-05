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
      className="relative overflow-hidden rounded-sm group"
    >
      <Image
        src={categoryData?.image}
        alt="category 1"
        className="w-full"
        width={100}
        height={100}
      />
      <a
        href="#"
        className="absolute inset-0 flex items-center justify-center font-medium text-white transition bg-black text:sm md:text-xl bg-opacity-40 font-roboto group-hover:bg-opacity-60"
      >
        {categoryData?.name}
      </a>
    </div>
  );
}
