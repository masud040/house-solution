import { getApproximateDeliveryDate } from "@/app/utils";
import { getSingleShippingCost } from "@/db/queries";
import { FaCheckCircle } from "react-icons/fa";
export default async function CheckoutItemCard({ product }) {
  const shippingCost = await getSingleShippingCost();
  const totalPrice =
    Math.floor(product.price - (product.price * product.discount) / 100) *
    product.quantity;

  const ApproximateDeliveryDate = getApproximateDeliveryDate();

  return (
    <div>
      <p className="paragraph-lg-base text-primary">
        Order# {product.order_id}
      </p>
      <div className="gap-3 p-4 border border-indigo-600 rounded-lg flex-column w-fit">
        <div className="space-y-1">
          <div className="gap-3 flex-start">
            <FaCheckCircle className="text-xl text-primary" />
            <p className="text-lg font-bold">$ {shippingCost}</p>
          </div>
          <p className="text-sm">Standard Delivery</p>
        </div>
        <p className="text-sm">{ApproximateDeliveryDate}</p>
      </div>
    </div>
  );
}
