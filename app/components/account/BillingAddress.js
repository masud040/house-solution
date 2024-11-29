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
          href={`/account/billing-address/${
            billingAddress?.userId ? "edit" : "add"
          }`}
          className="text-primary"
        >
          {billingAddress?.userId ? "Edit" : "Add"}
        </Link>
      </div>
      {billingAddress ? (
        <div className="space-y-2">
          <h4 className="font-medium">John Doe</h4>
          <p>Medan, North Sumatera</p>
          <p>20317</p>
          <p>0811 8877 988</p>
        </div>
      ) : (
        <Link href="/account/profile/edit">Please Add</Link>
      )}
    </div>
  );
};
