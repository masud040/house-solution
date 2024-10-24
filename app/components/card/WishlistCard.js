import Image from "next/image";
import WishlistActionBtn from "../Butttons/WishlistActionBtn";

export const WishlistCard = ({ product }) => {
  const { id, name, price, thumbnail, stock, discount } = product || {};
  const discountedPrice = price - (price * discount) / 100;
  return (
    <div className="gap-4 p-4 py-5 rounded-sm flex-between shadow-light-elevated_dark-elevated-dark">
      <div className="w-24">
        <Image
          src={thumbnail}
          width={200}
          height={100}
          alt={name}
          className="object-cover w-full rounded-sm h-14"
        />
      </div>
      <div className="flex-col w-full gap-2 flex-between md:gap-4 md:flex-row">
        <div className="w-full md:w-1/3">
          <h2 className="paragraph-lg-base text-secondary-darker">{name}</h2>
          <p className="text-xs font-medium text-secondary">
            Availability:{" "}
            {stock > 0 ? (
              <span className="text-green-600">In Stock</span>
            ) : (
              <span className="text-primary">Out Of Stock</span>
            )}
          </p>
        </div>

        <div className="flex-row flex-1 w-full gap-4 flex-end">
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
    </div>
  );
};
