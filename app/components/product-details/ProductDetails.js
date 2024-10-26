import { auth } from "@/auth";
import { getUserByEmail } from "@/db/queries";
import { ProdcutAction } from "./ProdcutAction";

export const ProductDetails = async ({ product }) => {
  const {
    name,
    brand,
    category,
    SKU,
    price,
    discount,
    details,
    stock,
    cart,
    wishlist,
    id,
  } = product || {};
  const session = await auth();
  const user = await getUserByEmail(session?.user?.email);
  const discountPrice = price - (price * discount) / 100;
  const plainProduct = JSON.parse(JSON.stringify(product));

  return (
    <div>
      <h2 className="mb-2 uppercase h4-medium-lg-h3-medium">{name}</h2>
      <div className="flex items-center mb-4">
        <div className="flex gap-1 text-sm text-yellow-400">
          <span>
            <i className="fa-solid fa-star"></i>
          </span>
          <span>
            <i className="fa-solid fa-star"></i>
          </span>
          <span>
            <i className="fa-solid fa-star"></i>
          </span>
          <span>
            <i className="fa-solid fa-star"></i>
          </span>
          <span>
            <i className="fa-solid fa-star"></i>
          </span>
        </div>
        <div className="ml-3 text-xs text-secondary-dark">(150 Reviews)</div>
      </div>
      <div className="space-y-2">
        <p className="space-x-2 font-semibold text-secondary-dark">
          <span>Availability: </span>
          {stock > 0 ? (
            <span className="text-green-600">In Stock</span>
          ) : (
            <span className="text-primary">Out Of Stock</span>
          )}
        </p>
        <p className="space-x-2">
          <span className="font-semibold text-secondary-dark">Brand: </span>
          <span>{brand}</span>
        </p>
        <p className="space-x-2">
          <span className="font-semibold text-secondary-dark">Category: </span>
          <span>{category}</span>
        </p>
        <p className="space-x-2">
          <span className="font-semibold text-secondary-dark">SKU: </span>
          <span>{SKU}</span>
        </p>
      </div>
      <div className="flex items-baseline mt-4 mb-1 space-x-2 font-roboto">
        <p className="h5-semibold text-primary">${discountPrice.toFixed(2)}</p>
        <p className="text-base line-through">${price.toFixed(2)}</p>
      </div>

      <p className="mt-4">{details}</p>

      <ProdcutAction product={plainProduct} userId={user?.id} />
    </div>
  );
};
