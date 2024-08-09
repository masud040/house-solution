import { BillingAddress } from "@/app/components/account/BillingAddress";
import { PersonalProfile } from "@/app/components/account/PersonalProfile";
import { ShippingAddress } from "@/app/components/account/ShippingAddress";
import Breadcrumb from "@/app/components/shared/Breadcrumb";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function AccountPage() {
  const session = await auth();
  if (!session) {
    return redirect("/login");
  }
  return (
    <section>
      <Breadcrumb name="Account" />
      <div className=" grid grid-cols-3 gap-4 mx-auto max-w-5xl">
        <PersonalProfile />
        <ShippingAddress />
        <BillingAddress />
      </div>
    </section>
  );
}
