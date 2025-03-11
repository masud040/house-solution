import Breadcrumb from "@/app/components/shared/Breadcrumb";
import { BillingAddress } from "@/app/components/user/account/BillingAddress";
import { PersonalProfile } from "@/app/components/user/account/PersonalProfile";
import { ShippingAddress } from "@/app/components/user/account/ShippingAddress";
import { auth } from "@/auth";
import { getShippingAddressByUserId, getUserByEmail } from "@/db/queries";

export default async function AccountPage({ searchParams }) {
  const session = await auth();

  const user = await getUserByEmail(session?.user?.email);
  const shippingAddress = await getShippingAddressByUserId(user?.id);

  return (
    <section className="container pt-6 pb-16">
      <Breadcrumb name1="Account" />
      <div className="grid w-full grid-cols-1 gap-6 mx-auto md:grid-cols-3">
        <PersonalProfile user={user} />
        <BillingAddress userId={user.id} />
        <ShippingAddress
          shippingAddress={shippingAddress}
          searchParams={searchParams}
        />
      </div>
    </section>
  );
}
