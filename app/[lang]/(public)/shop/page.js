import Breadcrumb from "@/app/components/shared/Breadcrumb";
import DrawerComponent from "@/app/components/user/shop/DrawerComponent";
import { ProductList } from "@/app/components/user/shop/ProductList";
import Sidebar from "@/app/components/user/shop/sidebar/Sidebar";
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
  searchParams: { category, min_price, max_price, search_term, page },
}) => {
  const allCategory = await getProductsCountByCategory();

  return (
    <section className="container pt-6 pb-16">
      <Breadcrumb name1="Shop" />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
        <DrawerComponent categories={allCategory} />
        <Sidebar categories={allCategory} />
        <ProductList
          category={refineCategory(category)}
          min_price={parseFloat(min_price)}
          max_price={parseFloat(max_price)}
          search_term={search_term}
          page={page}
        />
      </div>
    </section>
  );
};

export default ShopPage;
