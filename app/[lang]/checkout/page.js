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
  if (!session?.user) {
    return redirect("/login");
  }
  if (!shippingAddress) {
    redirect(
      `/en/account?selected=${searchParams.selected}&isCheckout=${true}`
    );
  }
  const productIds = searchParams?.selected?.split(",");
  const selectedProduct = await getSelectedCartProductByProductIds(
    productIds,
    user.id
  );
  return (
    <section className="container">
      <Breadcrumb name1="Shipping & Billing" />
      <div className="gap-6 pb-16"></div>
    </section>
  );
}
