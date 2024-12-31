import CheckoutItemCard from "@/app/components/card/CheckoutItemCard";
import Breadcrumb from "@/app/components/shared/Breadcrumb";
import { auth } from "@/auth";
import {
  getSelectedCartProductByProductIds,
  getShippingAddressByUserId,
  getUserByEmail,
} from "@/db/queries";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Checkout({ searchParams }) {
  const session = await auth();
  if (!session) {
    return redirect("/login");
  }
  const user = await getUserByEmail(session.user.email);
  const shippingAddress = await getShippingAddressByUserId(user?.id);

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
        <div className="flex items-start justify-between px-4 py-3 rounded-md shadow-light-elevated_dark-elevated-dark">
          <div className="space-y-2">
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
          </div>
          <Link
            href="/en/account/shipping-address/edit"
            className="transition-colors duration-300 text-primary-light hover:text-primary"
          >
            Edit
          </Link>
        </div>
        <div className="gap-4 flex-column">
          {selectedProducts?.length > 0 &&
            selectedProducts.map((product) => (
              <CheckoutItemCard key={product.id} product={product} />
            ))}
        </div>
      </div>
    </section>
  );
}
