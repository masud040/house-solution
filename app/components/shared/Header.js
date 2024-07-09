import { auth } from "@/auth";
import Image from "next/image";
import Link from "next/link";
import GenerateImageByLetter from "../auth/genrateImageByLetter";
import { Search } from "./Search";
export default async function Header() {
  const session = await auth();

  return (
    <header className="py-4 bg-white shadow-sm">
      <div className="container flex items-center justify-between">
        <Link href="/">
          <h1 className="inline-block font-bold text-transparent sm:text-lg md:text-xl lg:text-2xl bg-gradient-to-r from-indigo-600 via-purple-500 to-indigo-400 bg-clip-text">
            Sokher Corner
          </h1>
        </Link>
        <Search />
        <div className="flex items-center space-x-5 ">
          <Link
            href="/wishlist"
            className="relative text-center text-gray-700 transition hover:text-primary"
          >
            <div className="text-xl">
              <i className="fa-regular fa-heart"></i>
            </div>
            <div className="text-xs leading-3">Wishlist</div>
            <div className="absolute right-0 flex items-center justify-center w-5 h-5 text-xs text-white rounded-full -top-1 bg-primary">
              8
            </div>
          </Link>
          <Link
            href="/cart"
            className="relative text-center text-gray-700 transition hover:text-primary"
          >
            <div className="text-xl">
              <i className="fa-solid fa-bag-shopping"></i>
            </div>
            <div className="text-xs leading-3">Cart</div>
            <div className="absolute flex items-center justify-center w-5 h-5 text-xs text-white rounded-full -right-3 -top-1 bg-primary">
              2
            </div>
          </Link>
          <Link
            href="/account"
            className="relative text-center text-gray-700 transition hover:text-primary"
          >
            <div
              className={`${
                session?.user?.image || session?.user?.name
                  ? "flex items-center justify-center text-xl"
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
                    className="mb-0.5 rounded-full w-7 h-7 border border-indigo-600 p-0.5 "
                  />
                ) : (
                  <GenerateImageByLetter name={session?.user?.name} />
                )
              ) : (
                <i className="fa-regular fa-user "></i>
              )}
            </div>
            <div className="text-xs leading-3">Account</div>
          </Link>
        </div>
      </div>
    </header>
  );
}
