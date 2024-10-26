import Image from "next/image";
import WishlistActionBtn from "../Butttons/WishlistActionBtn";

export const WishlistCard = ({ product }) => {
  const { id, name, price, thumbnail, stock, discount } = product || {};
  const discountedPrice = price - (price * discount) / 100;
  return (
    <div className="gap-3 p-4 py-5 rounded-sm flex-between shadow-light-elevated_dark-elevated-dark">
      <div className="flex-1 gap-4 flex-start">
        <div className="relative w-24">
          <Image
            src={thumbnail}
            width={200}
            height={100}
            alt={name}
            className="object-cover w-full rounded-sm h-14"
          />
        </div>
        <div className="w-full">
          <h2 className="paragraph-lg-base text-secondary-darker">{name}</h2>
          <p className="text-xs font-medium">
            Availability:{" "}
            {stock > 0 ? (
              <span className="text-green-600">In Stock</span>
            ) : (
              <span className="text-primary">Out Of Stock</span>
            )}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-end justify-center flex-1 w-full gap-2 md:gap-4">
        <div className="space-x-2 text-primary">
          <span className="text-sm">{discountedPrice?.toFixed(2)}</span>
          <span className="text-sm line-through text-secondary-darker">
            {price}
          </span>
          <span className="text-sm text-secondary-darker">{discount}%</span>
        </div>
        <WishlistActionBtn productId={id} />
      </div>
    </div>
  );
};
