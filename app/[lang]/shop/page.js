import Breadcrumb from "@/app/components/shared/Breadcrumb";
import DrawerComponent from "@/app/components/shop/DrawerComponent";
import { ProductList } from "@/app/components/shop/ProductList";
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
const ShopPage = async ({
  searchParams: { category, min_price, max_price, search_term },
}) => {
  const allCategory = await getProductsCountByCategory();

  return (
    <section>
      <Breadcrumb name="Shop" />
      <div className="container grid grid-cols-1 gap-6 pt-4 pb-16 md:grid-cols-3 lg:grid-cols-4">
        <DrawerComponent categories={allCategory} />
        <Sidebar categories={allCategory} />
        <ProductList
          category={refineCategory(category)}
          min_price={parseFloat(min_price)}
          max_price={parseFloat(max_price)}
          search_term={search_term}
        />
      </div>
    </section>
  );
};

export default ShopPage;
