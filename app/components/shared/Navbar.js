import Image from "next/image";

import { auth } from "@/auth";
import Mattress from "@/public/assets/images/icons/bed-2.svg";
import Bed from "@/public/assets/images/icons/bed.svg";
import Office from "@/public/assets/images/icons/office.svg";
import Outdoor from "@/public/assets/images/icons/outdoor-cafe.svg";
import Sofa from "@/public/assets/images/icons/sofa.svg";
import Terrage from "@/public/assets/images/icons/terrace.svg";
import Link from "next/link";
import SignInSignUp from "../user/auth/SignInSignUp";
import { ActiveLink } from "./ActiveLink";

export default async function Navbar({ from }) {
  const session = await auth();

  return (
    <nav className="w-full shadow-xl bg-background-light dark:bg-background-dark">
      <div
        className={`${
          from === "dashboard" ? "px-6" : "px-4 md:px-10"
        }  py-4 flex-center`}
      >
        <div className="relative hidden px-4 py-2 cursor-pointer h-fit bg-primary md:flex-center group">
          <span className="text-background-light">
            <i className="fa-solid fa-bars"></i>
          </span>

          <span className="hidden ml-2 capitalize">All Categories</span>

          <div className="absolute left-0 invisible w-32 py-3 transition duration-300 divide-y shadow-lg opacity-0 bg-background-light dark:bg-background-dark top-full divide-dashed divide-secondary group-hover:opacity-100 group-hover:visible">
            <Link
              href="/shop/category=sofa"
              className="px-4 py-3 transition-colors duration-300 flex-start hover:bg-secondary-lighter dark:hover:bg-secondary-dark"
            >
              <Image src={Sofa} alt="sofa" className="object-contain size-5" />
              <span className="ml-6 text-sm">Sofa</span>
            </Link>
            <Link
              href="/shop?category=terrace"
              className="px-4 py-3 transition-colors duration-300 flex-start hover:bg-secondary-lighter dark:hover:bg-secondary-dark"
            >
              <Image
                src={Terrage}
                alt="terrace"
                className="object-contain size-5"
              />
              <span className="ml-6 text-sm">Terarce</span>
            </Link>
            <Link
              href="/shop?category=bed"
              className="px-4 py-3 transition flex-start hover:bg-secondary-lighter dark:hover:bg-secondary-dark"
            >
              <Image src={Bed} alt="bed" className="object-contain size-5" />
              <span className="ml-6 text-sm">Bed</span>
            </Link>
            <Link
              href="/shop?category=office"
              className="px-4 py-3 transition-colors duration-300 flex-start hover:bg-secondary-lighter dark:hover:bg-secondary-dark"
            >
              <Image
                src={Office}
                alt="office"
                className="object-contain size-5"
              />
              <span className="ml-6 text-sm">office</span>
            </Link>
            <Link
              href="/shop?category=outdoor"
              className="px-4 py-3 transition-colors duration-300 flex-start hover:bg-secondary-lighter dark:hover:bg-secondary-dark"
            >
              <Image
                src={Outdoor}
                alt="outdoor"
                className="object-contain size-5"
              />
              <span className="ml-6 text-sm">Outdoor</span>
            </Link>
            <Link
              href="/shop?category=mattress"
              className="px-4 py-3 transition-colors duration-300 flex-start hover:bg-secondary-lighter dark:hover:bg-secondary-dark"
            >
              <Image
                src={Mattress}
                alt="Mattress"
                className="object-contain size-5"
              />
              <span className="ml-6 text-sm">Mattress</span>
            </Link>
          </div>
        </div>

        <div className="flex-grow flex-between md:pl-12">
          <ul className="space-x-6 capitalize flex-center">
            <li>
              <ActiveLink name="Home" path="/en" />
            </li>
            <li>
              <ActiveLink name="Shop" path="/shop" />
            </li>
            <li>
              <ActiveLink name="About us" path="/about-us" />
            </li>
            <li>
              <ActiveLink name="Contact us" path="/contact-us" />
            </li>
          </ul>
          <SignInSignUp email={session?.user?.email} />
        </div>
      </div>
    </nav>
  );
}
