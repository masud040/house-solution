"use client";
import { AiFillProduct } from "react-icons/ai";
import { MdDashboard } from "react-icons/md";
import CustomLink from "./CustomLink";
export default function AdminSideMenu() {
  return (
    <ul className="flex flex-col gap-2 p-5 md:gap-3">
      <CustomLink Icon={MdDashboard} title="Dashboard" target="dashboard" />
      <CustomLink
        Icon={AiFillProduct}
        title="Manage Products"
        target="dashboard/manage_products"
      />
      <CustomLink
        Icon={AiFillProduct}
        title="Manage Products"
        target="dashboard/manage_products"
      />
      {/* <CustomLink
                      Icon={IoIosCreate}
                      title="Add Blog"
                      target="/add-blog"
                    /> */}
      {/* 
                    <CustomLink
                      Icon={FaCloudUploadAlt}
                      title="Generate Image Link"
                      target="/upload-image"
                      newTab={true}
                    /> */}
    </ul>
  );
}
