import { getApproximateDeliveryDate } from "@/app/utils";
import { getSingleShippingCost } from "@/db/queries";
import Image from "next/image";
import { FaCheckCircle } from "react-icons/fa";
export default async function CheckoutItemCard({ product }) {
  const shippingCost = await getSingleShippingCost();
  const discountedPrice =
    Math.floor(product?.price - (product?.price * product?.discount) / 100) *
    product.quantity;
  const totalPrice = Math.floor(product.price * product.quantity);
  const ApproximateDeliveryDate = getApproximateDeliveryDate();

  return (
    <div className="p-6 rounded-md shadow-light-elevated_dark-elevated-dark">
      <div className="space-y-8">
        <div className="gap-2 px-4 py-2 border rounded-lg border-primary-light flex-column w-fit">
          <div>
            <div className="gap-3 flex-start">
              <FaCheckCircle className="text-lg text-primary" />
              <p className="text-base font-bold">$ {shippingCost}</p>
            </div>
            <p className="text-sm">Standard Delivery</p>
            <p className="text-sm text-green-500 text-[13px] rounded-2xl">
              {ApproximateDeliveryDate}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-3">
          <div className="flex items-start justify-start col-span-2 gap-6">
            <div className="relative w-16">
              <Image
                src={product.thumbnail}
                width={200}
                height={200}
                alt={product.name}
                className="object-cover w-full rounded-sm h-14"
              />
            </div>
            <h2 className="paragraph-md-h5-semibold">{product.name}</h2>
          </div>
          <div className="flex items-start justify-between col-span-1 ">
            <div className="flex flex-col items-center justify-start w-full gap-2">
              <p className="text-base text-primary">${discountedPrice}</p>

              <p className="text-sm line-through text-secondary-darker dark:text-background-light">
                ${totalPrice}
              </p>
              <p className="hidden text-sm text-secondary-darker md:block dark:text-background-light">
                {product.discount}%
              </p>
              <div
                // onClick={handleDelete}
                title="Remove from cart"
                className="transition-all duration-300 cursor-pointer text-primary"
              >
                <i className="fa-solid fa-trash"></i>
              </div>
            </div>
            <div className="gap-1 px-4 py-2 text-sm bg-green-600/40 rounded-2xl flex-start">
              <p>QTY:</p>
              <p className="font-bold">{product.quantity}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
