import { getShippingAddressByUserId } from "@/db/queries";
import Link from "next/link";

export const ShippingAddress = async ({ userId }) => {
  const shippingAddress = await getShippingAddressByUserId(userId);
  console.log(shippingAddress);
  return (
    <div className="px-4 py-6 rounded shadow-light-elevated_dark-elevated-dark">
      <div className="mb-4 flex-between">
        <h3 className="h6-medium text-secondary-darkist dark:text-background-light">
          Shipping address
        </h3>
        <Link
          href={`/account/shipping-address/${
            shippingAddress?.userId ? "edit" : "add"
          }`}
          className="text-primary"
        >
          {shippingAddress?.userId ? "Edit" : "Add"}
        </Link>
      </div>
      {shippingAddress && (
        <div className="space-y-2">
          <h4 className="font-medium">{shippingAddress?.fullName}</h4>
          <p>{shippingAddress?.address}</p>
          <p>{shippingAddress?.landmark}</p>
          <p>{shippingAddress?.mobile}</p>
        </div>
      )}
    </div>
  );
};
