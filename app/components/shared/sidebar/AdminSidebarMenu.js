"use client";
import { AiFillProduct } from "react-icons/ai";
import { MdDashboard, MdReviews, MdViewQuilt } from "react-icons/md";
import { RiCoupon2Fill } from "react-icons/ri";
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
        title="Manage Orders"
        target="dashboard/manage_orders"
      />
      <CustomLink
        Icon={MdViewQuilt}
        title="Analytics and Reports"
        target="dashboard/analytics_reports"
      />

      <CustomLink
        Icon={RiCoupon2Fill}
        title="Manage Coupons"
        target="dashboard/manage_coupons"
        newTab={true}
      />
      <CustomLink
        Icon={MdReviews}
        title="Ratings @ Reviews"
        target="dashboard/ratings_reviews"
        newTab={true}
      />
    </ul>
  );
}
