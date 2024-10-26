"use client";

import { loginWithCredentials } from "@/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Field from "../shared/Field";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState("");
  const router = useRouter();
  async function handleOnSubmit(data) {
    try {
      const response = await loginWithCredentials(data);
      if (!response.error) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <form autoComplete="off" onSubmit={handleSubmit(handleOnSubmit)}>
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
          <input
            type="password"
            id="password"
            className="py-3 rounded-md input-field"
            {...register("password", { required: "Password is required!" })}
          />
        </Field>

        <div className="mt-6 flex-between">
          <div className="flex items-center">
            <input
              type="checkbox"
              name="remember"
              id="remember"
              className="rounded-sm cursor-pointer text-primary focus:ring-0"
              {...register("remember")}
            />
            <label
              htmlFor="remember"
              className="ml-3 cursor-pointer text-secondary-dark"
            >
              Remember me
            </label>
          </div>
          <a href="#" className="text-primary">
            Forgot password
          </a>
        </div>
        <div className="mt-6">
          <button
            type="submit"
            className="w-full py-3 uppercase btn-shadow-light-defaut-dark-primary"
          >
            Sign In
          </button>
        </div>
      </form>
    </>
  );
}
