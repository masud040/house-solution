"use client";

import { useState } from "react";

export default function RegisterForm() {
  const [error, setError] = useState("");
  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    if (!formData.get("name")) {
      setError("Name is required!");
      return;
    }
    if (!formData.get("email")) {
      setError("Email is required!");
      return;
    }
    if (!formData.get("password") || !formData.get("confirm")) {
      setError("Password is required!");
      return;
    }
    if (formData.get("password") !== formData.get("confirm")) {
      setError("Confirm password do not match!");
      return;
    }
    if (!formData.get("aggrement")) {
      setError("Please select an aggregate!");
      return;
    }
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
      setError(err.message);
    }
  }
  return (
    <>
      {error && <div className="text-red-500 text-md">{error}</div>}
      <form action="#" method="post" autocomplete="off" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <div>
            <label htmlFor="name" className="block mb-2 text-gray-600">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="block w-full px-4 py-3 text-sm text-gray-600 placeholder-gray-400 border border-gray-300 rounded focus:ring-0 focus:border-primary"
              placeholder="fulan fulana"
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-2 text-gray-600">
              Email address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="block w-full px-4 py-3 text-sm text-gray-600 placeholder-gray-400 border border-gray-300 rounded focus:ring-0 focus:border-primary"
              placeholder="youremail.@domain.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 text-gray-600">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="block w-full px-4 py-3 text-sm text-gray-600 placeholder-gray-400 border border-gray-300 rounded focus:ring-0 focus:border-primary"
              placeholder="*******"
            />
          </div>
          <div>
            <label htmlFor="confirm" className="block mb-2 text-gray-600">
              Confirm password
            </label>
            <input
              type="password"
              name="confirm"
              id="confirm"
              className="block w-full px-4 py-3 text-sm text-gray-600 placeholder-gray-400 border border-gray-300 rounded focus:ring-0 focus:border-primary"
              placeholder="*******"
            />
          </div>
        </div>
        <div className="mt-6">
          <div className="flex items-center">
            <input
              type="checkbox"
              name="aggrement"
              id="aggrement"
              className="rounded-sm cursor-pointer text-primary focus:ring-0"
            />
            <label
              htmlFor="aggrement"
              className="ml-3 text-gray-600 cursor-pointer"
            >
              I have read and agree to the{" "}
              <a href="#" className="text-primary">
                terms & conditions
              </a>
            </label>
          </div>
        </div>
        <div className="mt-4">
          <button
            type="submit"
            className="block w-full py-2 font-medium text-center text-white uppercase transition border rounded bg-primary border-primary hover:bg-transparent hover:text-primary font-roboto"
          >
            create account
          </button>
        </div>
      </form>
    </>
  );
}
