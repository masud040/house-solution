"use client";
import { signIn } from "next-auth/react";

export default function SocialLogin({ pageFrom }) {
  function handleLogin(name) {
    signIn(name, { callbackUrl: `http://localhost:3000` });
  }
  return (
    <>
      <div className="relative flex justify-center mt-6">
        <div className="relative z-10 px-3 text-gray-600 uppercase bg-white">
          Or login with
        </div>
        <div className="absolute left-0 w-full border-b-2 border-gray-200 top-3"></div>
      </div>
      <div className="flex gap-4 mt-4">
        <button className="w-1/2 py-2 text-sm font-medium text-center text-white uppercase bg-blue-800 rounded font-roboto hover:bg-blue-700">
          facebook
        </button>
        <button
          onClick={() => handleLogin("google")}
          className="w-1/2 py-2 text-sm font-medium text-center text-white uppercase bg-red-600 rounded font-roboto hover:bg-red-500"
        >
          google
        </button>
      </div>
      <p className="mt-4 text-center text-gray-600">
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
