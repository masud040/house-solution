import DrawerComponent from "@/app/components/shop/DrawerComponent";
import ShopBreadcrumb from "@/app/components/shop/ShopBreadcrumb";
import Sidebar from "@/app/components/shop/Sidebar";

const ShopPage = () => {
  return (
    <>
      <ShopBreadcrumb />
      <div className="container grid items-start grid-cols-2 gap-6 pt-4 pb-16 md:grid-cols-4">
        <DrawerComponent />
        <Sidebar />
      </div>
    </>
  );
};

export default ShopPage;
