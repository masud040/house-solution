function OrderSuccessConfirmation({
  searchParams: { trans_id, order_id, cus_name },
}) {
  return (
    <div className="max-w-3xl p-10 border rounded-lg shadow-lg h-fit">
      <div className="space-y-6 text-center">
        <h1 className="font-bold text-transparent h6-md-h5-lg-h4 bg-gradient-to-r from-primary-dark to-purple-800 bg-clip-text">
          Sokher Corner
        </h1>
        <h3 className="text-lg font-semibold">Your Order Confirmation!</h3>
      </div>
      <div className="space-y-4">
        <p className="text-lg">
          Hi <strong>{cus_name}</strong>,
        </p>
        <p>
          Your Order <strong>#{order_id}</strong> has been successfully
          confirmed, and your transaction id is <strong>3{trans_id}</strong>.
        </p>

        <p>
          Your order is now being processed and will be shipped shortly. You can
          track your order's progress using the button below:
        </p>

        <a
          href="http://localhost:3000/en/track-order/${order_id}/order-details"
          class="button"
        >
          Track Your Order
        </a>
      </div>

      <p class="footer">Thank you for choosing Sokher Corner!</p>
    </div>
  );
}

export default OrderSuccessConfirmation;
