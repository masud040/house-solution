"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";

export default function SignInSignUp({ email }) {
  return email ? (
    <button
      onClick={signOut}
      className="text-gray-200 transition hover:text-white"
    >
      Logout
    </button>
  ) : (
    <Link href="/login" className="text-gray-200 transition hover:text-white">
      Login
    </Link>
  );
}
