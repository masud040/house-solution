import Image from "next/image";

export default function CategoryCard({ categoryData }) {
  return (
    <div className="relative overflow-hidden rounded-sm group">
      <Image
        src={categoryData?.image}
        alt="category 1"
        className="w-full"
        width={100}
        height={100}
      />
      <a
        href="#"
        className="absolute inset-0 flex items-center justify-center text-xl font-medium text-white transition bg-black bg-opacity-40 font-roboto group-hover:bg-opacity-60"
      >
        {categoryData?.name}
      </a>
    </div>
  );
}
