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
    <section className="container">
      <Breadcrumb name="Account" />
      <div className="grid max-w-5xl grid-cols-3 gap-4 pb-16 mx-auto">
        <PersonalProfile />
        <ShippingAddress />
        <BillingAddress />
      </div>
    </section>
  );
}
