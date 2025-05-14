import Breadcrumb from "@/app/components/shared/Breadcrumb";
import { BillingAddressEditForm } from "@/app/components/shared/Form/BillingAddressEditForm";
import { auth } from "@/auth";
import { getBillingAddressByUserId, getUserByEmail } from "@/db/queries";

export default async function EditBillingAddress() {
  const session = await auth();

  const user = await getUserByEmail(session?.user?.email);
  const billingAddress = await getBillingAddressByUserId(user.id);
  return (
    <section>
      <Breadcrumb
        nameWithPath={{
          name: "Account",
          path: "/profile",
        }}
        name1="Billing Address"
        name2="Edit"
      />
      <div className="container pt-4">
        <div className="max-w-xl p-8 mx-auto rounded-md shadow-light-elevated_dark-elevated-dark">
          <h2 className="pb-4 text-xl text-center">Edit Billing Address</h2>
          <BillingAddressEditForm
            user={user}
            address={billingAddress}
            useFor="billing"
          />
        </div>
      </div>
    </section>
  );
}
