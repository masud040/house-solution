"use client";

import { loginWithCredentials } from "@/actions";
import useMode from "@/app/hooks/useMode";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { BiSolidHide, BiSolidShow } from "react-icons/bi";
import { toast } from "react-toastify";
import Field from "../../shared/Field";
export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [show, setShow] = useState(false);
  const router = useRouter();
  const [globalError, setGlobalError] = useState("");
  const [loading, setLoading] = useState(false);
  const { theme } = useMode();
  async function handleOnSubmit(data) {
    try {
      setLoading(true);
      setGlobalError("");
      toast.loading("Logging...", {
        toastId: "login",
      });
      const response = await loginWithCredentials(data);

      if (!response.error) {
        toast.update("login", {
          render: "Successfully Logged in",
          isLoading: false,
          type: "success",
          autoClose: 1500,
        });
        router.replace("/");
      }
    } catch (error) {
      toast.update("login", {
        render: error.message,
        isLoading: false,
        autoClose: 1500,
        type: "error",
      });
      setGlobalError(error.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
      <Field label="Email Address" htmlFor="email" error={errors?.email}>
        <input
          type="email"
          id="email"
          className="py-3 rounded-md input-field"
          placeholder="youremail.@domain.com"
          {...register("email", { required: "Email is required!" })}
        />
      </Field>
      <Field label="Password" htmlFor="password" error={errors?.password}>
        <div className="relative">
          <input
            type={show ? "text" : "password"}
            id="password"
            className="py-3 rounded-md input-field"
            {...register("password", { required: "Password is required!" })}
          />
          <span
            onClick={() => setShow((i) => !i)}
            className="absolute text-2xl translate-y-1/2 text-secondary right-2"
          >
            {show ? <BiSolidShow /> : <BiSolidHide />}
          </span>
        </div>
      </Field>

      <div className="my-6 flex-between">
        <div className="flex items-center">
          <input
            type="checkbox"
            name="remember"
            {...register("remember")}
            id="remember"
            className="hidden peer"
          />
          <label
            htmlFor="remember"
            className="flex items-center justify-center w-5 h-5 border-2 rounded-md cursor-pointer border-primary peer-checked:bg-primary peer-checked:border-primary peer-focus:ring-2 peer-focus:ring-offset-2 peer-focus:ring-primary"
          >
            {/* Check Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 text-white peer-checked:block"
              viewBox="0 0 20 20"
              fill={theme === "dark" ? "#212428" : "currentColor"}
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </label>
          <span htmlFor="remember" className="ml-3 cursor-pointer">
            Remember me
          </span>
        </div>
        <a href="#" className="text-primary">
          Forgot password
        </a>
      </div>
      {globalError && (
        <p className="my-5 font-medium text-center text-primary">
          {globalError}
        </p>
      )}
      <div>
        <button
          type="submit"
          className="w-full py-3 btn-shadow-light-defaut-dark-primary"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </form>
  );
}
