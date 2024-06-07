import LoginForm from "@/app/components/auth/LoginFom";
import SocialLogin from "@/app/components/auth/SocialLogin";

export default function LoginPage() {
  return (
    <div className="max-w-lg px-6 mx-auto overflow-hidden rounded shadow py-7">
      <h2 className="mb-1 text-2xl font-medium uppercase">Login</h2>
      <p className="mb-6 text-sm text-gray-600">welcome back customer</p>
      <LoginForm />

      <SocialLogin pageFrom="login" />
    </div>
  );
}
