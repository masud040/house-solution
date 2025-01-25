import Link from "next/link";

function OrderSuccessConfirmation({
  searchParams: { trans_id, order_id, cus_name },
}) {
  return (
    <div className="max-w-3xl p-10 border rounded-lg shadow-lg">
      <div className="space-y-6 text-center">
        <h1 className="font-bold text-transparent h6-md-h5-lg-h4 bg-gradient-to-r from-primary-dark to-purple-800 bg-clip-text">
          Sokher Corner
        </h1>
        <h3 className="text-lg font-semibold">Your Order Confirmation!</h3>
      </div>
      <div className="space-y-4 text-lg">
        <p className="text-lg">
          Hi <strong>{cus_name}</strong>,
        </p>
        <p>
          Your Order <strong>#{order_id}</strong> has been successfully
          confirmed, and your transaction id is <strong>#{trans_id}</strong>
        </p>

        <p>
          Your order is now being processed and will be shipped shortly. You can
          track your order's progress using the button below:
        </p>

        <div className="py-6">
          <Link
            href={`http://localhost:3000/en/track-orders/${order_id}`}
            className="py-3 text-white basic-btn bg-primary border-primary"
          >
            Track Your Order
          </Link>
        </div>
      </div>

      <p className="pt-4 text-sm text-center">
        Thank you for choosing Sokher Corner!
      </p>
    </div>
  );
}

export default OrderSuccessConfirmation;
