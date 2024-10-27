import RegisterForm from "@/app/components/auth/RegisterForm";
import SocialLogin from "@/app/components/auth/SocialLogin";

export default function RegisterPage() {
  return (
    <section className="container my-12">
      <div className="max-w-lg p-6 mx-auto overflow-hidden rounded-md shadow-light-elevated_dark-elevated-dark">
        <h2 className="mb-4 text-center capitalize h4-medium">
          Create an account
        </h2>
        <RegisterForm />
        <SocialLogin pageFrom={"register"} />
      </div>
    </section>
  );
}
