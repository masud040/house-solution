import Image from "next/image";
import WishlistActionBtn from "../Butttons/WishlistActionBtn";

export const WishlistCard = ({ product }) => {
  const { id, name, price, thumbnail, stock, discount } = product || {};
  const discountedPrice = price - (price * discount) / 100;
  return (
    <div className="flex items-center justify-between gap-4 p-4 rounded-sm shadow-custom">
      <div className="w-28">
        <Image
          src={thumbnail}
          width={200}
          height={100}
          alt={name}
          className="w-full h-20"
        />
      </div>
      <div className="flex flex-col items-center justify-between flex-1 gap-2 md:gap-4 md:flex-row">
        <div className="w-full md:w-1/3">
          <h2 className="text-sm text-gray-800 md:text-lg">{name}</h2>
          <p className="text-xs text-gray-500">
            Availability:{" "}
            {stock > 0 ? (
              <span className="text-green-600">In Stock</span>
            ) : (
              <span className="text-red-600">Out Of Stock</span>
            )}
          </p>
        </div>

        <div className="flex flex-row items-center justify-start flex-1 w-full gap-4 md:justify-around">
          <div className="space-x-2 text-primary">
            <span>{discountedPrice?.toFixed(2)}</span>
            <span className="text-sm text-gray-700 line-through">{price}</span>
            <span className="text-sm text-gray-700">{discount}%</span>
          </div>
          <WishlistActionBtn productId={id} />
        </div>
      </div>
    </div>
  );
};
