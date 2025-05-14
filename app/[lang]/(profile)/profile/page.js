import Breadcrumb from "@/app/components/shared/Breadcrumb";
import { PersonalProfile } from "@/app/components/user/account/PersonalProfile";
import { ShippingAddress } from "@/app/components/user/account/ShippingAddress";
import { auth } from "@/auth";
import { getShippingAddressByUserId, getUserByEmail } from "@/db/queries";

export default async function ProfilePage({ searchParams }) {
  const session = await auth();

  const user = await getUserByEmail(session?.user?.email);
  const shippingAddress = await getShippingAddressByUserId(user?.id);

  return (
    <section className="container h-screen">
      <Breadcrumb name1="Account" />
      <div className="grid w-full grid-cols-1 gap-6 mx-auto md:grid-cols-2 ">
        <PersonalProfile user={user} />

        <ShippingAddress
          addressTitle={"Address"}
          shippingAddress={shippingAddress}
          searchParams={searchParams}
        />
      </div>
    </section>
  );
}
