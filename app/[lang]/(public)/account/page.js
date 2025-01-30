import Breadcrumb from "@/app/components/shared/Breadcrumb";
import { BillingAddress } from "@/app/components/user/account/BillingAddress";
import { PersonalProfile } from "@/app/components/user/account/PersonalProfile";
import { ShippingAddress } from "@/app/components/user/account/ShippingAddress";
import { auth } from "@/auth";
import { getShippingAddressByUserId, getUserByEmail } from "@/db/queries";
import { redirect } from "next/navigation";

export default async function AccountPage({ searchParams }) {
  const session = await auth();
  if (!session) {
    return redirect("/login");
  }
  const user = await getUserByEmail(session?.user?.email);
  const shippingAddress = await getShippingAddressByUserId(user?.id);

  return (
    <section className="container pt-10 pb-16">
      <Breadcrumb name1="Account" />
      <div className="grid w-full grid-cols-3 gap-6 mx-auto">
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
