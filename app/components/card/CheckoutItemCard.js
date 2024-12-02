export default function CheckoutItemCard({ product }) {
  return (
    <div>
      <p className="paragraph-lg-base">Order# {product.order_id}</p>
    </div>
  );
}
