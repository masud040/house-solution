import { BillingAddressAddForm } from "@/app/components/Form/BillingAddressAddForm";
import Breadcrumb from "@/app/components/shared/Breadcrumb";
import { auth } from "@/auth";
import { getBillingAddressByUserId, getUserByEmail } from "@/db/queries";
import { redirect } from "next/navigation";

export default async function EditBillingAddress() {
  const session = await auth();
  if (!session) {
    return redirect("/login");
  }
  const user = await getUserByEmail(session?.user?.email);
  const billingAddress = await getBillingAddressByUserId(user.id);
  return (
    <section>
      <Breadcrumb name1="Account" name2="Profile" />
      <div className="container pt-4 pb-16">
        <div className="max-w-xl p-8 mx-auto rounded-md shadow-light-elevated_dark-elevated-dark">
          <h2 className="pb-4 text-xl text-center">Edit Your Profile</h2>
          <BillingAddressAddForm
            user={user}
            billingAddress={billingAddress}
            useFor="billing"
          />
        </div>
      </div>
    </section>
  );
}
