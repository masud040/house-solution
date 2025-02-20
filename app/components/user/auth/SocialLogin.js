"use client";
import { signIn } from "next-auth/react";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
export default function SocialLogin({ pageFrom }) {
  function handleLogin(name) {
    signIn(name, { callbackUrl: `https://house-solution.vercel.app` });
  }
  return (
    <>
      <div className="relative mt-6 flex-center">
        <div className="relative z-10 px-3 uppercase bg-background-light dark:bg-background-dark">
          Or login with
        </div>
        <div className="absolute left-0 w-full border-b-2 border-light-default_dark-tertiary top-3"></div>
      </div>
      <div className="flex gap-4 mt-4">
        <button className="w-1/2 gap-2 py-3 font-medium text-center bg-blue-700 rounded text-background-light flex-center shadow-light-elevated_dark-elevated-dark">
          <FaFacebook className="text-2xl" />
          Facebook
        </button>
        <button
          onClick={() => handleLogin("google")}
          className="w-1/2 gap-2 py-3 font-medium text-center rounded bg-background-light flex-center text-secondary shadow-light-elevated_dark-elevated-dark"
        >
          <FcGoogle className="text-2xl" />
          Google
        </button>
      </div>
      <p className="mt-4 text-center">
        {pageFrom === "login"
          ? "Don't have account"
          : "Already have an account"}
        ?{" "}
        <a
          href={pageFrom === "login" ? "/register" : "/login"}
          className="text-primary"
        >
          {pageFrom === "login" ? "Register" : "Login"}
        </a>
      </p>
    </>
  );
}
