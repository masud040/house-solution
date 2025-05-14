import Link from "next/link";

export const ShippingAddress = ({
  addressTitle,
  shippingAddress,
  searchParams,
}) => {
  return (
    <div className="px-4 py-6 rounded shadow-light-elevated_dark-elevated-dark">
      <div className="mb-4 flex-between">
        <h3 className="h6-medium text-secondary-darkist dark:text-background-light">
          {addressTitle ?? "Shipping address"}
        </h3>
        <Link
          href={`/en/profile/address/shipping-address/${
            shippingAddress?.userId
              ? "edit"
              : `${
                  searchParams?.selected
                    ? `add?selected=${searchParams?.selected}&isCheckout=${searchParams?.isCheckout}`
                    : "add"
                }`
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
