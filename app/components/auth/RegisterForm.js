"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { BiSolidHide, BiSolidShow } from "react-icons/bi";
import { toast } from "react-toastify";
import Field from "../shared/Field";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
  } = useForm();

  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [globalError, setGlobalError] = useState("");
  const router = useRouter();
  async function handleOnSubmit(data) {
    if (data?.password !== data?.confirmPassword) {
      setError("confirmPassword", {
        type: "custom",
        message: "Password and confirm password does not match!",
      });
    }
    setGlobalError("");
    setLoading(true); // Start loading
    toast.loading("Registering your account....", {
      toastId: "register",
    });

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data?.name,
          email: data?.email,
          password: data?.password,
        }),
      });
      const response = await res.json();
      if (response.status === 400) {
        setGlobalError(response.message);
        toast.update("register", {
          render: response.message,
          type: "error",
          isLoading: false,
          autoClose: 1500,
        });

        reset();
      } else if (response.status === 201) {
        toast.update("register", {
          render: "User registered successfully!",
          type: "success",
          isLoading: false,
          autoClose: 1500,
        });

        router.push("/en/login");
      }
    } catch (err) {
      setGlobalError(err.message);
      console.log(err);
    } finally {
      setLoading(false); // Stop loading
    }
  }
  return (
    <form
      action="#"
      method="post"
      autocomplete="off"
      onSubmit={handleSubmit(handleOnSubmit)}
    >
      <div className="space-y-2">
        <Field label="Full Name" htmlFor="name" error={errors?.name}>
          <input
            type="text"
            id="name"
            className="py-3 capitalize rounded-md input-field"
            placeholder="Jhon Doe"
            {...register("name", { required: "Name is required!" })}
          />
        </Field>

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
              placeholder="Password"
              {...register("password", {
                required: "Password is required!",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
            />
            <span
              onClick={() => setShow((i) => !i)}
              className="absolute text-2xl translate-y-1/2 right-2"
            >
              {show ? <BiSolidShow /> : <BiSolidHide />}
            </span>
          </div>
        </Field>
        <Field
          label="Confirm Password"
          htmlFor="confirmPassword"
          error={errors?.confirmPassword}
        >
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              id="confirmPassword"
              className="py-3 rounded-md input-field"
              placeholder="Confirm Password"
              {...register("confirmPassword", {
                required: "Confirm password is required!",
              })}
            />
            <span
              onClick={() => setShowConfirm((i) => !i)}
              className="absolute text-2xl translate-y-1/2 right-2"
            >
              {showConfirm ? <BiSolidShow /> : <BiSolidHide />}
            </span>
          </div>
        </Field>
      </div>
      <div className="my-5">
        <Field htmlFor="agreement" error={errors?.agreement}>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="agreement"
              id="agreement"
              className="hidden peer"
              {...register("agreement", {
                required: "Please confirm our terms & conditions!",
              })}
            />
            <label
              htmlFor="agreement"
              className="flex items-center justify-center w-5 h-5 border-2 rounded-md cursor-pointer border-primary peer-checked:bg-primary peer-checked:border-primary peer-focus:ring-2 peer-focus:ring-offset-2 peer-focus:ring-primary"
            >
              {/* Check Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 text-white peer-checked:block"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </label>
            <span htmlFor="agreement" className="ml-3 cursor-pointer">
              I have read and agree to the{" "}
              <a href="#" className="text-primary">
                terms & conditions
              </a>
            </span>
          </div>
        </Field>
      </div>
      {globalError && (
        <p className="mb-5 font-medium text-center text-primary">
          {globalError}
        </p>
      )}
      <div>
        <button
          type="submit"
          className="w-full py-3 btn-shadow-light-defaut-dark-primary"
        >
          {loading ? "Processing..." : "Create Account"}
        </button>
      </div>
    </form>
  );
}
