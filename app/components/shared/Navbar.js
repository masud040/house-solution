import Image from "next/image";

import { auth } from "@/auth";
import Mattress from "@/public/assets/images/icons/bed-2.svg";
import Bed from "@/public/assets/images/icons/bed.svg";
import Office from "@/public/assets/images/icons/office.svg";
import Outdoor from "@/public/assets/images/icons/outdoor-cafe.svg";
import Sofa from "@/public/assets/images/icons/sofa.svg";
import Terrage from "@/public/assets/images/icons/terrace.svg";
import Link from "next/link";
import SignInSignUp from "../auth/SignInSignUp";

export default async function Navbar() {
  const session = await auth();
  return (
    <nav className="bg-gray-800">
      <div className="container flex">
        <div className="relative items-center hidden px-8 py-4 cursor-pointer bg-primary md:flex group">
          <span className="text-white">
            <i className="fa-solid fa-bars"></i>
          </span>

          <span className="hidden ml-2 text-white capitalize">
            All Categories
          </span>

          <div className="absolute left-0 invisible w-32 py-3 transition duration-300 bg-white divide-y divide-gray-300 shadow-md opacity-0 top-full divide-dashed group-hover:opacity-100 group-hover:visible">
            <Link
              href="/shop/category=sofa"
              className="flex items-center px-4 py-3 transition hover:bg-gray-100"
            >
              <Image src={Sofa} alt="sofa" className="object-contain w-5 h-5" />
              <span className="ml-6 text-sm text-gray-600">Sofa</span>
            </Link>
            <Link
              href="/shop?category=terrace"
              className="flex items-center px-4 py-3 transition hover:bg-gray-100"
            >
              <Image
                src={Terrage}
                alt="terrace"
                className="object-contain w-5 h-5"
              />
              <span className="ml-6 text-sm text-gray-600">Terarce</span>
            </Link>
            <Link
              href="/shop?category=bed"
              className="flex items-center px-4 py-3 transition hover:bg-gray-100"
            >
              <Image src={Bed} alt="bed" className="object-contain w-5 h-5" />
              <span className="ml-6 text-sm text-gray-600">Bed</span>
            </Link>
            <Link
              href="/shop?category=office"
              className="flex items-center px-4 py-3 transition hover:bg-gray-100"
            >
              <Image
                src={Office}
                alt="office"
                className="object-contain w-5 h-5"
              />
              <span className="ml-6 text-sm text-gray-600">office</span>
            </Link>
            <Link
              href="/shop?category=outdoor"
              className="flex items-center px-4 py-3 transition hover:bg-gray-100"
            >
              <Image
                src={Outdoor}
                alt="outdoor"
                className="object-contain w-5 h-5"
              />
              <span className="ml-6 text-sm text-gray-600">Outdoor</span>
            </Link>
            <Link
              href="/shop?category=mattress"
              className="flex items-center px-4 py-3 transition hover:bg-gray-100"
            >
              <Image
                src={Mattress}
                alt="Mattress"
                className="object-contain w-5 h-5"
              />
              <span className="ml-6 text-sm text-gray-600">Mattress</span>
            </Link>
          </div>
        </div>

        <div className="flex items-center justify-between flex-grow py-5 md:pl-12">
          <div className="flex items-center space-x-6 capitalize">
            <Link
              href="/"
              className="text-gray-200 transition hover:text-white"
            >
              Home
            </Link>
            <Link
              href="/shop"
              className="text-gray-200 transition hover:text-white"
            >
              Shop
            </Link>
            <Link
              href="/about-us"
              className="text-gray-200 transition hover:text-white"
            >
              About us
            </Link>
            <Link
              href="/contact-us"
              className="text-gray-200 transition hover:text-white"
            >
              Contact us
            </Link>
          </div>
          <SignInSignUp email={session?.user?.email} />
        </div>
      </div>
    </nav>
  );
}
