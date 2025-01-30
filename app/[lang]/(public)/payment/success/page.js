import OrderSuccessConfirmation from "@/app/components/paymentrelated/OrderSuccessConfirmation";

export default function Success({ searchParams }) {
  return (
    <section className="container pt-10 pb-16">
      <div className="flex-center">
        <OrderSuccessConfirmation searchParams={searchParams} />
      </div>
    </section>
  );
}
