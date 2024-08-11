import Image from "next/image";
import WishlistActionBtn from "../Butttons/WishlistActionBtn";

export const WishlistCard = ({ product }) => {
  const {
    id,
    name,
    price,
    thumbnail,
    stock,
    quantity: productQuantity,
    userId,
    discount,
    selected,
  } = product || {};
  const discountedPrice = price - (price * discount) / 100;
  return (
    <div className="flex items-center justify-between gap-4 p-4 rounded-sm shadow-custom">
      <div className="w-28">
        <Image
          src={thumbnail}
          width={200}
          height={200}
          alt="product 6"
          className="w-full"
        />
      </div>
      <div className="w-1/3">
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

      <div className="flex flex-col items-center gap-3 md:flex-row">
        <div className="space-x-2 text-primary">
          <span>{discountedPrice?.toFixed(2)}</span>
          <span className="text-sm text-gray-700 line-through">{price}</span>
          <span className="text-sm text-gray-700">{discount}%</span>
        </div>
      </div>

      <WishlistActionBtn productId={id} />
    </div>
  );
};
