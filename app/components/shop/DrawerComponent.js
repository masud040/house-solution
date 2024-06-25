import { useState } from "react";
import Drawer from "./Drawer";

const DrawerComponent = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  return (
    <>
      <div className="text-center md:hidden">
        <button
          className="text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 block md:hidden"
          type="button"
          aria-controls="drawer-example"
        >
          <ion-icon name="grid-outline"></ion-icon>
        </button>
      </div>
      {showDrawer && <Drawer />}
    </>
  );
};

export default DrawerComponent;
