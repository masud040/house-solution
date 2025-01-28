import Image from "next/image";

export default function OrderedProductCard({ productData }) {
  console.log(productData);
  return (
    <div>
      <div className="flex items-center justify-between px-8">
        <div className="flex items-center flex-1 gap-10">
          <Image
            src={productData.thumbnail}
            height={100}
            width={100}
            alt={productData.name}
            className="rounded-md"
          />

          <h2 className="text-lg text-start">{productData.name}</h2>
        </div>

        <div className="flex items-center justify-between flex-1">
          <div className="gap-2 flex-center">
            <p className="text-sm font-medium">Price:</p>
            <p className="font-medium">
              {Math.floor(
                (productData.price - 100 / productData.discount) *
                  productData.quantity
              )}
              $
            </p>
          </div>
          <div className="gap-2 flex-center">
            <p className="text-sm font-medium">QTY:</p>
            <p className="font-medium">
              {Math.floor(
                (productData.price - 100 / productData.discount) *
                  productData.quantity
              )}
            </p>
          </div>
          <p
            className={`text-sm font-medium capitalize px-5 py-1.5 rounded-xl ${
              productData.status === "shipped"
                ? "bg-green-200 text-primary-light"
                : "bg-secondary-light"
            }`}
          >
            {productData.status}
          </p>
        </div>
      </div>
    </div>
  );
}
