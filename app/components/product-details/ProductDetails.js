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
      <h2 className="mb-2 text-3xl font-medium uppercase">{name}</h2>
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
        <div className="ml-3 text-xs text-gray-500">(150 Reviews)</div>
      </div>
      <div className="space-y-2">
        <p className="space-x-2 font-semibold text-gray-800">
          <span>Availability: </span>
          {stock > 0 ? (
            <span className="text-green-600">In Stock</span>
          ) : (
            <span className="text-red-600">Out Of Stock</span>
          )}
        </p>
        <p className="space-x-2">
          <span className="font-semibold text-gray-800">Brand: </span>
          <span className="text-gray-600">{brand}</span>
        </p>
        <p className="space-x-2">
          <span className="font-semibold text-gray-800">Category: </span>
          <span className="text-gray-600">{category}</span>
        </p>
        <p className="space-x-2">
          <span className="font-semibold text-gray-800">SKU: </span>
          <span className="text-gray-600">{SKU}</span>
        </p>
      </div>
      <div className="flex items-baseline mt-4 mb-1 space-x-2 font-roboto">
        <p className="text-xl font-semibold text-primary">
          ${discountPrice.toFixed(2)}
        </p>
        <p className="text-base text-gray-400 line-through">
          ${price.toFixed(2)}
        </p>
      </div>

      <p className="mt-4 text-gray-600">{details}</p>

      <ProdcutAction product={plainProduct} userId={user?.id} />
    </div>
  );
};
