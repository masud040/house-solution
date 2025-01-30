import Breadcrumb from "@/app/components/shared/Breadcrumb";
import { BillingAddressAddForm } from "@/app/components/shared/Form/BillingAddressAddForm";
import { auth } from "@/auth";
import { getUserByEmail } from "@/db/queries";
import { redirect } from "next/navigation";

export default async function AddBillingAddress() {
  const session = await auth();
  if (!session) {
    return redirect("/login");
  }
  const user = await getUserByEmail(session?.user?.email);

  return (
    <section className="container pt-10 pb-16">
      <Breadcrumb name1="Account" name2="Profile" />
      <div className="pt-4">
        <div className="max-w-xl p-8 mx-auto rounded-md shadow-light-elevated_dark-elevated-dark">
          <h2 className="pb-4 text-xl text-center">Add Billing Address</h2>
          <BillingAddressAddForm user={user} useFor="billing" />
        </div>
      </div>
    </section>
  );
}
