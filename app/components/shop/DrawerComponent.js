"use client";
import GridBtn from "@/public/assets/images/icons/grid-outline.svg";
import Image from "next/image";
import { useState } from "react";
import Drawer from "./Drawer";

const DrawerComponent = ({ categories }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  return (
    <>
      <div className="text-center md:hidden">
        <button
          onClick={() => setShowDrawer((s) => !s)}
          className={`text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 block`}
          type="button"
        >
          <Image src={GridBtn} width={18} height={18} alt="grid-btn" />
        </button>
      </div>

      <Drawer
        categories={categories}
        showDrawer={showDrawer}
        setShowDrawer={setShowDrawer}
      />
    </>
  );
};

export default DrawerComponent;
