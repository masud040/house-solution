import { getBillingAddressByUserId } from "@/db/queries";
import Link from "next/link";

export const BillingAddress = async ({ userId }) => {
  const billingAddress = await getBillingAddressByUserId(userId);

  return (
    <div className="p-5 rounded shadow-light-elevated_dark-elevated-dark">
      <div className="mb-4 flex-between">
        <h3 className="h6-medium text-secondary-darkist dark:text-background-light">
          Billing address
        </h3>
        <Link
          href={`/en/profile/address/billing-address/${
            billingAddress?.userId ? "edit" : "add"
          }`}
          className="text-primary"
        >
          {billingAddress?.userId ? "Edit" : "Add"}
        </Link>
      </div>
      {billingAddress && (
        <div className="space-y-2">
          <h4 className="font-medium">{billingAddress?.fullName}</h4>
          <p>{billingAddress?.address}</p>
          <p>{billingAddress?.landmark}</p>
          <p>{billingAddress?.mobile}</p>
        </div>
      )}
    </div>
  );
};
