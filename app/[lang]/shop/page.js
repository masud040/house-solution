import DrawerComponent from "@/app/components/shop/DrawerComponent";
import { ProductList } from "@/app/components/shop/ProductList";
import ShopBreadcrumb from "@/app/components/shop/ShopBreadcrumb";
import Sidebar from "@/app/components/shop/sidebar/Sidebar";
import { getProductsCountByCategory } from "@/db/queries";
function refineCategory(category) {
  const decodeCategory = decodeURI(category);
  if (decodeCategory == "undefined") {
    return "";
  } else {
    return decodeCategory;
  }
}
const ShopPage = async ({ searchParams: { category } }) => {
  const allCategory = await getProductsCountByCategory();

  return (
    <>
      <ShopBreadcrumb />
      <div className="container grid items-start grid-cols-2 gap-6 pt-4 pb-16 md:grid-cols-4">
        <DrawerComponent categories={allCategory} />
        <Sidebar categories={allCategory} />
        <ProductList category={refineCategory(category)} />
      </div>
    </>
  );
};

export default ShopPage;
