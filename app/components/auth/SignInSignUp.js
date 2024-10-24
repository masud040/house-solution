"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";

export default function SignInSignUp({ email }) {
  return email ? (
    <button
      onClick={signOut}
      className="transition base-normal text-background-light/90 hover:text-background-light"
    >
      Logout
    </button>
  ) : (
    <Link
      href="/login"
      className="transition base-normal text-background-light/90 hover:text-background-light"
    >
      Login
    </Link>
  );
}
