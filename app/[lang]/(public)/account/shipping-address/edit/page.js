import Breadcrumb from "@/app/components/shared/Breadcrumb";
import { BillingAddressAddForm } from "@/app/components/shared/Form/BillingAddressAddForm";
import { auth } from "@/auth";
import { getShippingAddressByUserId, getUserByEmail } from "@/db/queries";

export default async function EditShippingAddress({ searchParams }) {
  const session = await auth();
  if (!session) {
    return redirect("/login");
  }
  const user = await getUserByEmail(session?.user?.email);
  const shippingAddress = await getShippingAddressByUserId(user?.id);
  return (
    <section className="container pt-10 pb-16">
      <Breadcrumb
        nameWithPath={{
          name: "Account",
          path: "/account",
        }}
        name1="Shipping Address"
        name2="Edit"
      />
      <div className="pt-4">
        <h2 className="pb-4 text-xl text-center">Edit Shipping Address</h2>
        <BillingAddressAddForm
          user={user}
          address={shippingAddress}
          useFor="shipping"
          searchParams={searchParams}
        />
      </div>
    </section>
  );
}
