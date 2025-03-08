import Image from "next/image";

export default function OrderedProductCard({ order }) {
  return (
    <div>
      <div className="flex items-center justify-between gap-4 p-6 rounded-md shadow-light-elevated_dark-elevated-dark">
        <div className="flex items-center flex-1 gap-4">
          <div className="relative h-[50px] w-[80px]">
            <Image
              src={order.product_thumbnail}
              height={100}
              width={100}
              alt={order.product_name}
              className="absolute w-full h-full bg-cover rounded-md"
            />
          </div>

          <h2 className="text-sm font-medium md:text-base text-start">
            {order.product_name}
          </h2>
        </div>

        <div className="flex items-center justify-between flex-1 gap-2">
          <div>
            <div className="gap-2 flex-start">
              <p className="text-[12px] md:text-[14px] font-medium">Price:</p>
              <p className="text-[12px] md:text-[14px] font-medium">
                {Math.floor(
                  (order.product_price - 100 / order.product_discount) *
                    order.quantity
                )}
                $
              </p>
            </div>
            <div className="gap-2 flex-start">
              <p className="text-[12px] md:text-[14px] font-medium">QTY:</p>
              <p className="text-[12px] md:text-[14px] font-medium">
                {order.quantity}
              </p>
            </div>
          </div>
          <p
            className={`text-[10px] md:text-[13px] capitalize px-3 text-center py-1.5 rounded-lg ${
              order.status === "shipped" || order.status === "seller to pack"
                ? "bg-green-200"
                : "bg-secondary-lightest"
            }`}
          >
            {order.status}
          </p>
        </div>
      </div>
    </div>
  );
}
