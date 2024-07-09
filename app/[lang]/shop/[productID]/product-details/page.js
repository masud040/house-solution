import { ProdcutDescription } from "@/app/components/product-details/ProdcutDescription";
import { ProductDetails } from "@/app/components/product-details/ProductDetails";
import { ProductImages } from "@/app/components/product-details/ProductImages";
import Breadcrumb from "@/app/components/shared/Breadcrumb";
import { getProductById } from "@/db/queries";

export default async function ProductDetailsPage({ params: { productID } }) {
  const product = await getProductById(productID);

  return (
    <section>
      <Breadcrumb name="Product Details" />
      <div className="container grid grid-cols-1 gap-6 md:grid-cols-2">
        <ProductImages
          name={product?.name}
          thumbnail={product?.thumbnail}
          gallery={product?.images}
        />
        <ProductDetails product={product} />
      </div>
      <ProdcutDescription description={product?.description} />
    </section>
  );
}
