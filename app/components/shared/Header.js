import { auth } from "@/auth";
import { getCartData, getWishlistCount } from "@/db/queries";
import Image from "next/image";
import Link from "next/link";
import { PiHeartThin, PiShoppingCartSimpleThin } from "react-icons/pi";
import { VscAccount } from "react-icons/vsc";
import GenerateImageByLetter from "../auth/genrateImageByLetter";
import ModeButton from "./ModeButton";
import { Search } from "./Search";
export default async function Header() {
  const session = await auth();
  const cartItems = await getCartData(session?.user?.email);
  const count = await getWishlistCount(session?.user?.email);

  return (
    <header className="shadow-sm bg-background-light dark:bg-background-dark">
      <div className="container items-center gap-8 py-5 flex-between">
        <Link href="/">
          <h1 className="hidden font-bold text-transparent md:inline h6-md-h5-lg-h4 bg-gradient-to-r from-indigo-600 via-purple-500 to-indigo-400 bg-clip-text">
            Sokher Corner
          </h1>
        </Link>
        <Search />
        <ul className="space-x-5 flex-end">
          <li title="Wishlist">
            <Link href="/wishlist" className="header-link">
              <div>
                <PiHeartThin className="text-3xl" />
              </div>
              <div className="absolute font-semibold rounded-full paragraph-under-small size-4 -right-2 flex-center -top-1 bg-secondary dark:bg-background-light/80 text-background-light dark:text-secondary-dark">
                {count > 0 ? count : 0}
              </div>
            </Link>
          </li>
          <li title="Cart">
            <Link href="/cart" className="header-link">
              <div>
                <PiShoppingCartSimpleThin className="text-3xl" />
              </div>
              <div className="absolute font-semibold rounded-full paragraph-under-small size-4 -right-2 flex-center -top-1 bg-secondary dark:bg-background-light/80 text-background-light dark:text-secondary-dark">
                {cartItems?.length > 0 ? cartItems.length : 0}
              </div>
            </Link>
          </li>
          <li title="Account">
            <Link href="/account" className="header-link">
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
                      height={18}
                      width={18}
                      alt="profile"
                      className="rounded-full size-8 border border-indigo-600 p-0.5 "
                    />
                  ) : (
                    <GenerateImageByLetter name={session?.user?.name} />
                  )
                ) : (
                  <VscAccount className="text-3xl" />
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
