function OrderSuccessConfirmation({
  searchParams: { trans_id, order_id, cus_name },
}) {
  return (
    <div class="container">
      <div class="header">
        <h1>Sokher Corner</h1>
        <h3>Your Order Confirmation!</h3>
      </div>
      <p>
        Hi <strong>${cus_name}</strong>,
      </p>
      <p>
        Your Order <strong>#${order_id}</strong> has been successfully
        confirmed, and your transaction id is <strong>3${trans_id}</strong>.
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

      <p class="footer">Thank you for choosing Sokher Corner!</p>
    </div>
  );
}

export default OrderSuccessConfirmation;
