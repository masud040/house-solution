import { BillingAddress } from "@/app/components/user/account/BillingAddress";
import { ShippingAddress } from "@/app/components/user/account/ShippingAddress";
import { auth } from "@/auth";
import { getShippingAddressByUserId, getUserByEmail } from "@/db/queries";

export default async function Address({ searchParams }) {
  const session = await auth();

  const user = await getUserByEmail(session?.user?.email);
  const shippingAddress = await getShippingAddressByUserId(user?.id);

  return (
    <section className="container h-screen">
      <div className="grid w-full grid-cols-1 gap-6 mx-auto md:grid-cols-2 ">
        <BillingAddress userId={user?.id} />
        <ShippingAddress
          shippingAddress={shippingAddress}
          searchParams={searchParams}
        />
      </div>
    </section>
  );
}
