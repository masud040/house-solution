import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product }) {
  const { id, name, price, discount, thumbnail } = product || {};

  const discountPrice = price - (price * discount) / 100;

  return (
    <div className="flex flex-col overflow-hidden bg-white rounded shadow group">
      <div>
        <div className="relative">
          <Image
            src={thumbnail}
            alt={name}
            width={200}
            height={200}
            className="w-full sm:h-[277px] md:h-[120px] lg:h-[157px] xl:h-[200px]"
          />
          <div className="absolute inset-0 flex items-center justify-center gap-2 transition bg-black opacity-0 bg-opacity-40 group-hover:opacity-100">
            <Link
              href={`shop/${id}/product-details`}
              className="flex items-center justify-center h-8 text-lg text-white transition rounded-full w-9 bg-primary hover:bg-gray-800"
              title="view product"
            >
              <i className="fa-solid fa-magnifying-glass"></i>
            </Link>
            <button
              className="flex items-center justify-center h-8 text-lg text-white transition rounded-full w-9 bg-primary hover:bg-gray-800"
              title="add to wishlist"
            >
              <i className="fa-solid fa-heart"></i>
            </button>
          </div>
        </div>
        <div className="px-4 pt-4 pb-3">
          <Link href={`shop/${id}/product-details`}>
            <h4 className="mb-2 text-xl font-medium text-gray-800 uppercase transition hover:text-primary">
              {name}
            </h4>
          </Link>
          <div className="flex items-baseline mb-1 space-x-2">
            <p className="text-xl font-semibold text-primary">
              ${discountPrice?.toFixed(2)}
            </p>
            <p className="text-sm text-gray-400 line-through">${price}</p>
          </div>
          <div className="flex items-center">
            <div className="flex gap-1 text-sm text-yellow-400">
              <span>
                <i className="fa-solid fa-star"></i>
              </span>
            </div>
            <div className="ml-3 text-xs text-gray-500">(100)</div>
          </div>
        </div>
      </div>
      <div className="flex-1"></div>
      <button
        href="#"
        className="block w-full py-1 text-center text-white transition border rounded-b bg-primary border-primary hover:bg-transparent hover:text-primary"
      >
        Add to cart
      </button>
    </div>
  );
}
