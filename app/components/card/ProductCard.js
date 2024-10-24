import Image from "next/image";
import Link from "next/link";
import AddToCartBtn from "../Butttons/AddToCartBtn";

export default async function ProductCard({ product, userId }) {
  const { id, name, price, discount, thumbnail } = product || {};

  const discountPrice = price - (price * discount) / 100;

  return (
    <div className="flex-col p-3 rounded-lg md:p-5 flex-between shadow-light-elevated_dark-elevated-dark group size-full">
      <div>
        <div className="relative w-full overflow-hidden transform rounded-md h-36 lg:h-52">
          <Image
            src={thumbnail}
            alt={name}
            fill
            className="object-cover transition-all duration-500 ease-in-out group-hover:scale-105"
          />
        </div>
        <div className="p-4">
          <Link href={`shop/${id}/product-details`}>
            <h4 className="mb-2 product-title">{name}</h4>
          </Link>
          <div className="mb-1 space-x-2 flex-baseline">
            <p className="paragraph-md-h5-semibold text-primary">
              ${discountPrice?.toFixed(2)}
            </p>
            <p className="line-through small-md-paragraph">${price}</p>
          </div>
          <div className="flex-start">
            <div className="gap-1 text-sm flex-start text-primary-light">
              <span>
                <i className="text-sm fa-solid fa-star"></i>
              </span>
            </div>
            <div className="ml-3 text-xs">(100)</div>
          </div>
        </div>
      </div>
      <div className="flex-1"></div>
      <AddToCartBtn productId={id} userId={userId} />
    </div>
  );
}
