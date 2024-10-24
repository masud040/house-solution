"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";

export default function SignInSignUp({ email }) {
  return email ? (
    <button onClick={signOut} className="nav-link text-background-light">
      Logout
    </button>
  ) : (
    <Link href="/login" className="nav-link text-background-light">
      Login
    </Link>
  );
}
