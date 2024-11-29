import { BillingAddress } from "@/app/components/account/BillingAddress";
import { PersonalProfile } from "@/app/components/account/PersonalProfile";
import { ShippingAddress } from "@/app/components/account/ShippingAddress";
import Breadcrumb from "@/app/components/shared/Breadcrumb";
import { auth } from "@/auth";
import { getUserByEmail } from "@/db/queries";
import { redirect } from "next/navigation";

export default async function AccountPage() {
  const session = await auth();
  const user = await getUserByEmail(session.user.email);
  if (!session) {
    return redirect("/login");
  }
  return (
    <section className="container">
      <Breadcrumb name1="Account" />
      <div className="grid w-full grid-cols-3 gap-6 pb-16 mx-auto">
        <PersonalProfile user={user} />
        <ShippingAddress userId={user.id} />
        <BillingAddress userId={user.id} />
      </div>
    </section>
  );
}
