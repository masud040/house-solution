import { ProdcutDescription } from "@/app/components/product-details/ProdcutDescription";
import { ProductImages } from "@/app/components/product-details/ProductImages";
import { ProductOverview } from "@/app/components/product-details/ProductOverview";
import Breadcrumb from "@/app/components/shared/Breadcrumb";
import { getProductById } from "@/db/queries";

export default async function ProductDetailsPage({ params: { productID } }) {
  const product = await getProductById(productID);

  return (
    <section className="container pt-10 pb-16">
      <Breadcrumb name1="Product Details" />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <ProductImages
          name={product?.name}
          thumbnail={product?.thumbnail}
          gallery={product?.images}
        />
        <ProductOverview product={product} />
      </div>
      <ProdcutDescription description={product?.description} />
    </section>
  );
}
