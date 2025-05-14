import Breadcrumb from "@/app/components/shared/Breadcrumb";
import { BillingAddressEditForm } from "@/app/components/shared/Form/BillingAddressEditForm";
import { auth } from "@/auth";
import { getShippingAddressByUserId, getUserByEmail } from "@/db/queries";

export default async function EditShippingAddress({ searchParams }) {
  const session = await auth();
  const user = await getUserByEmail(session?.user?.email);
  const shippingAddress = await getShippingAddressByUserId(user?.id);
  return (
    <section>
      <Breadcrumb
        nameWithPath={{
          name: "Account",
          path: "/profile",
        }}
        name1="Shipping Address"
        name2="Edit"
      />
      <div className="pt-4">
        <div className="max-w-xl p-8 mx-auto rounded-md shadow-light-elevated_dark-elevated-dark">
          <h2 className="pb-4 text-xl text-center">Edit Shipping Address</h2>
          <BillingAddressEditForm
            user={user}
            address={shippingAddress}
            useFor="shipping"
            searchParams={searchParams}
          />
        </div>
      </div>
    </section>
  );
}
