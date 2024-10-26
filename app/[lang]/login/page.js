import LoginForm from "@/app/components/auth/LoginFom";
import SocialLogin from "@/app/components/auth/SocialLogin";

export default function LoginPage() {
  return (
    <section className="container my-12">
      <div className="max-w-lg p-6 mx-auto overflow-hidden rounded-md shadow-light-elevated_dark-elevated-dark ">
        <h2 className="mb-4 text-center capitalize h4-medium ">Sign In With</h2>

        <LoginForm />

        <SocialLogin pageFrom="login" />
      </div>
    </section>
  );
}
