import { auth } from "@/auth";
import { getCartData, getWishlistCount } from "@/db/queries";
import Image from "next/image";
import Link from "next/link";
import { FaRegHeart } from "react-icons/fa6";
import { GrCart } from "react-icons/gr";
import { RiAccountCircleLine } from "react-icons/ri";
import GenerateImageByLetter from "../user/auth/GenrateImageByLetter";
import Logo from "./Logo";
import ModeButton from "./ModeButton";
import { Search } from "./Search";
export default async function Header() {
  const session = await auth();
  const cartItems = await getCartData(session?.user?.email);
  const count = await getWishlistCount(session?.user?.email);

  return (
    <header className="shadow-sm bg-background-light dark:bg-background-dark">
      <div className="container items-center gap-8 py-4 flex-between">
        <Logo />
        <Search />
        <ul className="space-x-5 h-[48px] flex-end">
          <li title="Wishlist">
            <Link href="/wishlist" className="header-link">
              <div>
                <FaRegHeart className="size-7 text-primary-light" />
              </div>
              {count > 0 && (
                <div className="absolute font-semibold rounded-full paragraph-under-small size-4 -right-2 flex-center -top-1 bg-primary-light text-background-light ">
                  {count}
                </div>
              )}
            </Link>
          </li>
          <li title="Cart">
            <Link href="/cart" className="header-link">
              <div>
                <GrCart className="size-7 text-primary-light" />
              </div>
              {cartItems?.length > 0 && (
                <div className="absolute font-semibold rounded-full paragraph-under-small size-4 -right-2 flex-center -top-1 bg-primary-light text-background-light">
                  {cartItems?.length}
                </div>
              )}
            </Link>
          </li>
          <li title="Account">
            <Link href="/dashboard" className="header-link">
              <div
                className={`${
                  session?.user?.image || session?.user?.name
                    ? "flex-center text-xl"
                    : "text-xl"
                }`}
              >
                {session?.user ? (
                  session?.user?.image ? (
                    <Image
                      src={session?.user?.image}
                      height={28}
                      width={28}
                      alt="profile"
                      className="border border-primary-light rounded-full size-8 p-[1px]"
                    />
                  ) : (
                    <GenerateImageByLetter name={session?.user?.name} />
                  )
                ) : (
                  <RiAccountCircleLine className="size-8 text-primary-light" />
                )}
              </div>
            </Link>
          </li>
          <ModeButton />
        </ul>
      </div>
    </header>
  );
}
