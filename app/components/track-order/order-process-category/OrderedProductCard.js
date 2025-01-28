import Image from "next/image";

export default function OrderedProductCard({ order }) {
  console.log(order);
  return (
    <div>
      <div className="flex items-center justify-between px-8 pb-8 border-b-4">
        <div className="flex items-center flex-1 gap-10">
          <Image
            src={order.product_thumbnail}
            height={100}
            width={100}
            alt={order.product_name}
            className="rounded-md"
          />

          <h2 className="text-lg text-start">{order.product_name}</h2>
        </div>

        <div className="flex items-center justify-between flex-1">
          <div className="gap-2 flex-center">
            <p className="text-sm font-medium">Price:</p>
            <p className="font-medium">
              {Math.floor(
                (order.product_price - 100 / order.product_discount) *
                  order.quantity
              )}
              $
            </p>
          </div>
          <div className="gap-2 flex-center">
            <p className="text-sm font-medium">QTY:</p>
            <p className="font-medium">{order.quantity}</p>
          </div>
          <p
            className={`text-sm font-medium capitalize px-5 py-1.5 rounded-xl ${
              order.status === "shipped"
                ? "bg-green-200 text-primary-light"
                : "bg-secondary-light"
            }`}
          >
            {order.status}
          </p>
        </div>
      </div>
    </div>
  );
}
