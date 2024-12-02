import CheckoutItemCard from "@/app/components/card/CheckoutItemCard";
import Breadcrumb from "@/app/components/shared/Breadcrumb";
import { auth } from "@/auth";
import {
  getSelectedCartProductByProductIds,
  getShippingAddressByUserId,
  getUserByEmail,
} from "@/db/queries";
import { redirect } from "next/navigation";

export default async function Checkout({ searchParams }) {
  const session = await auth();
  const user = await getUserByEmail(session.user.email);
  const shippingAddress = await getShippingAddressByUserId(user?.id);
  console.log(shippingAddress);
  if (!session?.user) {
    return redirect("/login");
  }
  if (!shippingAddress) {
    redirect(
      `/en/account?selected=${searchParams.selected}&isCheckout=${true}`
    );
  }
  const productIds = searchParams?.selected?.split(",");
  const selectedProducts = await getSelectedCartProductByProductIds(
    productIds,
    user.id
  );

  return (
    <section className="container">
      <Breadcrumb name1="Shipping & Billing" />
      <div className="gap-6 pb-16">
        {/* shipping address */}
        <div className="p-4 space-y-2 rounded-md shadow-light-elevated_dark-elevated-dark">
          <div className="gap-5 flex-start">
            <p>{shippingAddress?.fullName}</p>
            <p>{shippingAddress?.mobile}</p>
          </div>
          <div>
            <p className="paragraph-lg-base">
              {shippingAddress?.address}, {shippingAddress?.province},{" "}
              {shippingAddress?.city}, {shippingAddress?.area}
            </p>
          </div>
          <div></div>
        </div>
        {selectedProducts?.length > 0 &&
          selectedProducts.map((product) => (
            <CheckoutItemCard key={product.id} product={product} />
          ))}
      </div>
    </section>
  );
}
