import RegisterForm from "@/app/components/auth/RegisterForm";
import SocialLogin from "@/app/components/auth/SocialLogin";

export default function RegisterPage() {
  return (
    <div className="max-w-lg px-6 mx-auto overflow-hidden rounded shadow py-7">
      <h2 className="mb-1 text-2xl font-medium uppercase">Create an account</h2>
      <p className="mb-6 text-sm text-gray-600">Register for new cosutumer</p>
      <RegisterForm />
      <SocialLogin pageFrom={"register"} />\
    </div>
  );
}
