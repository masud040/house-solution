import Image from "next/image";

export default function OrderedProductCard({ productData }) {
  console.log(productData);
  return (
    <div>
      <div>{productData.status}</div>
      <div className="flex items-center justify-evenly">
        <Image
          src={productData.thumbnail}
          height={100}
          width={100}
          alt={productData.name}
          className="rounded-md"
        />
        <h2>{productData.name}</h2>
        <div className="gap-2 flex-center">
          <p>Price:</p>
          <p>
            {Math.floor(
              (productData.price - 100 / productData.discount) *
                productData.quantity
            )}
            $
          </p>
        </div>
        <div className="gap-2 flex-center">
          <p>QTY:</p>
          <p>
            {Math.floor(
              (productData.price - 100 / productData.discount) *
                productData.quantity
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
