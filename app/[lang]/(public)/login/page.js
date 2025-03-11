"use client";
import LoginForm from "@/app/components/user/auth/LoginFom";
import SocialLogin from "@/app/components/user/auth/SocialLogin";
import { useSearchParams } from "next/navigation";

export default function LoginPage() {
  console.log("LoginPage component loaded");
  const searchParams = useSearchParams();
  console.log("searchParams:", searchParams);
  const callbackUrl = searchParams.get("callbackUrl");
  console.log("callbackUrl:", callbackUrl);
  return (
    <section className="container pt-6 pb-16">
      <div className="max-w-lg p-8 mx-auto overflow-hidden rounded-md shadow-light-elevated_dark-elevated-dark">
        <h2 className="mb-4 text-center capitalize h4-medium">Login</h2>

        <LoginForm />

        <SocialLogin pageFrom="login" />
      </div>
    </section>
  );
}
