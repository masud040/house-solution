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
  } = useForm();

  const [show, setShow] = useState(false);
  async function handleOnSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    // if (!formData.get("name")) {
    //   setError("Name is required!");
    //   return;
    // }
    // if (!formData.get("email")) {
    //   setError("Email is required!");
    //   return;
    // }
    // if (!formData.get("password") || !formData.get("confirm")) {
    //   setError("Password is required!");
    //   return;
    // }
    // if (formData.get("password") !== formData.get("confirm")) {
    //   setError("Confirm password do not match!");
    //   return;
    // }
    // if (!formData.get("aggrement")) {
    //   setError("Please select an aggregate!");
    //   return;
    // }
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
    } catch (err) {
      // setError(err.message);
    }
  }
  return (
    <form action="#" method="post" autocomplete="off" onSubmit={handleOnSubmit}>
      <div className="space-y-2">
        <Field label="Full Name" htmlFor="name" error={errors?.name}>
          <input
            type="text"
            id="name"
            className="py-3 rounded-md input-field"
            placeholder="fulan fulana"
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
              {...register("password", { required: "Password is required!" })}
            />
            <span
              onClick={() => setShow((i) => !i)}
              className="absolute text-2xl translate-y-1/2 right-2"
            >
              {show ? <BiSolidHide /> : <BiSolidShow />}
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
              type={show ? "text" : "password"}
              id="confirmPassword"
              className="py-3 rounded-md input-field"
              {...register("confirmPassword", {
                required: "Confirm password is required!",
              })}
            />
            <span
              onClick={() => setShow((i) => !i)}
              className="absolute text-2xl translate-y-1/2 right-2"
            >
              {show ? <BiSolidHide /> : <BiSolidShow />}
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
              {...register("agreement", { required: "Agrement is required!" })}
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
