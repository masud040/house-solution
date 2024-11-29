import { BillingAddressAddForm } from "@/app/components/Form/BillingAddressAddForm";
import Breadcrumb from "@/app/components/shared/Breadcrumb";
import { auth } from "@/auth";
import { getUserByEmail } from "@/db/queries";

export default async function AddBillingAddress() {
  const session = await auth();
  const user = await getUserByEmail(session?.user?.email);

  return (
    <section>
      <Breadcrumb name1="Account" name2="Profile" />
      <div className="container pt-4 pb-16">
        <div className="max-w-xl p-6 mx-auto rounded-md shadow-light-elevated_dark-elevated-dark">
          <h2 className="text-xl text-center">Add Billing Address</h2>
          <BillingAddressAddForm user={user} />
        </div>
      </div>
    </section>
  );
}
