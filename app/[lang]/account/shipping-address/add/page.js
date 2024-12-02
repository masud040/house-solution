import { BillingAddressAddForm } from "@/app/components/Form/BillingAddressAddForm";
import Breadcrumb from "@/app/components/shared/Breadcrumb";
import { auth } from "@/auth";
import { getUserByEmail } from "@/db/queries";

export default async function AddShippingAddress({ searchParams }) {
  const session = await auth();
  if (!session) {
    return redirect("/login");
  }
  const user = await getUserByEmail(session?.user?.email);

  return (
    <section className="container">
      <Breadcrumb
        nameWithPath={{
          name: "Account",
          path: "/account",
        }}
        name1="Shipping Address"
        name2="Edit"
      />
      <div className="container pt-4 pb-16">
        <div className="max-w-xl p-8 mx-auto rounded-md shadow-light-elevated_dark-elevated-dark">
          <h2 className="pb-4 text-xl text-center">Add Shipping Address</h2>
          <BillingAddressAddForm
            user={user}
            useFor="shipping"
            searchParams={searchParams}
          />
        </div>
      </div>
    </section>
  );
}
