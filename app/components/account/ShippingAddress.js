import Link from "next/link";

export const ShippingAddress = () => {
  return (
    <div className="px-4 py-6 rounded shadow-light-elevated_dark-elevated-dark">
      <div className="mb-4 flex-between">
        <h3 className="h6-medium text-secondary-darkist dark:text-background-light">
          Shipping address
        </h3>
        <Link href="/account/shipping-address/edit" className="text-primary">
          Edit
        </Link>
      </div>
      <div className="space-y-2">
        <h4 className="font-medium">John Doe</h4>
        <p>Medan, North Sumatera</p>
        <p>20371</p>
        <p>0811 8877 988</p>
      </div>
    </div>
  );
};
