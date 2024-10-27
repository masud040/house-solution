"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { BiSolidHide, BiSolidShow } from "react-icons/bi";
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
  async function handleOnSubmit(data) {
    if (data?.password !== data?.confirmPassword) {
      setError("confirmPassword", {
        type: "custom",
        message: "Password and confirm password does not match!",
      });
    }

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
    } catch (err) {
      console.log(err);
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
      <div className="mt-6">
        <Field htmlFor="agreement" error={errors?.agreement}>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="agreement"
              id="agreement"
              className="rounded-sm cursor-pointer text-primary focus:ring-0"
              {...register("agreement", {
                required: "Please confirm our terms & conditions!",
              })}
            />
            <label htmlFor="agreement" className="ml-3 cursor-pointer">
              I have read and agree to the{" "}
              <a href="#" className="text-primary">
                terms & conditions
              </a>
            </label>
          </div>
        </Field>
      </div>
      <div className="mt-4">
        <button
          type="submit"
          className="w-full py-3 uppercase btn-shadow-light-defaut-dark-primary"
        >
          create account
        </button>
      </div>
    </form>
  );
}
