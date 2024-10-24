import { auth } from "@/auth";
import { getCartData, getWishlistCount } from "@/db/queries";
import Image from "next/image";
import Link from "next/link";
import GenerateImageByLetter from "../auth/genrateImageByLetter";
import { Search } from "./Search";
export default async function Header() {
  const session = await auth();
  const cartItems = await getCartData(session?.user?.email);
  const count = await getWishlistCount(session?.user?.email);

  return (
    <header className="shadow-sm bg-background-light">
      <div className="container items-center py-6 flex-between">
        <Link href="/">
          <h1 className="inline-block font-bold text-transparent h6-md-h5-lg-h4 bg-gradient-to-r from-indigo-600 via-purple-500 to-indigo-400 bg-clip-text">
            Sokher Corner
          </h1>
        </Link>
        <Search />
        <div className="space-x-5 flex-end">
          <Link href="/wishlist" className="header-link">
            <div className="h5-medium">
              <i className="fa-regular fa-heart"></i>
            </div>
            <div className="text-sm leading-3">Wishlist</div>
            <div className="absolute right-0 text-xs text-white rounded-full size-5 flex-center -top-1 bg-primary-light">
              {count > 0 ? count : 0}
            </div>
          </Link>
          <Link href="/cart" className="header-link">
            <div className="h5-medium">
              <i className="fa-solid fa-bag-shopping"></i>
            </div>
            <div className="text-sm leading-3">Cart</div>
            <div className="absolute text-xs text-white rounded-full size-5 -right-3 flex-center -top-1 bg-primary-light">
              {cartItems?.length > 0 ? cartItems.length : 0}
            </div>
          </Link>
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
                    className="mb-0.5 rounded-full size-7 border border-indigo-600 p-0.5 "
                  />
                ) : (
                  <GenerateImageByLetter name={session?.user?.name} />
                )
              ) : (
                <i className="fa-regular fa-user "></i>
              )}
            </div>
            <div className="text-sm leading-3">Account</div>
          </Link>
        </div>
      </div>
    </header>
  );
}
