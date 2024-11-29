"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Field from "../shared/Field";

export const BillingAddressAddForm = ({ user, billingAddress }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [divisions, setDivisions] = useState([]);
  const [billingAddressData, setBillingAddressData] = useState({
    fullName: billingAddress?.fullName ?? user.name ?? "",
    mobile: billingAddress?.mobile ?? "",
    area: billingAddress?.area ?? "",
    city: billingAddress?.city ?? "",
    province: billingAddress?.province ?? "",
    province: billingAddress?.province ?? "",
    landmark: billingAddress?.landmark ?? "",
    address: billingAddress?.address ?? "",
  });
  console.log(billingAddressData);
  useEffect(() => {
    async function getDivision() {
      const res = await fetch(`https://bdapis.com/api/v1.2/divisions`);
      const data = await res.json();
      if (data?.status?.code === 200) {
        setDivisions(data.data);
      }
    }
    getDivision();
  }, []);
  useEffect(() => {
    async function getCity() {
      const res = await fetch(
        `https://bdapis.com/api/v1.2/division/${billingAddressData?.area}`
      );
      const data = await res.json();
      if (data?.status?.code === 200) {
        console.log(data.data);
      }
    }
    getCity();
  }, [billingAddressData?.area]);

  async function onSubmit(data) {
    console.log(data);
    try {
    } catch (error) {
      console.log(error);
    }
  }
  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    console.log(name, value);
    setBillingAddressData({ ...billingAddressData, [name]: value });
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="my-4">
      <Field label="Full Name" error={errors?.fullName} htmlFor="fullName">
        <input
          type="text"
          placeholder="Enter your full name"
          defaultValue={billingAddressData?.fullName}
          className="py-3 rounded-md input-field"
          {...register("fullName", {
            required: "Name is required",
            minLength: {
              value: 2,
              message: "Name must be at least 2 characters long",
            },
            maxLength: {
              value: 70,
              message: "Name must not exceed 100 characters",
            },
          })}
        />
      </Field>
      <Field label="Mobile" error={errors?.mobile} htmlFor="mobile">
        <input
          type="text"
          placeholder="Enter your mobile number"
          className="py-3 rounded-md input-field"
          {...register("mobile", {
            required: "Mobile number is required!",
            minLength: {
              value: 11,
              message: "Mobile number cannot exceed 11 digits",
            },
            maxLength: {
              value: 14,
              message: "Mobile number cannot exceed 11 digits",
            },
          })}
        />
      </Field>

      <Field label="Area" error={errors?.area} htmlFor="area">
        <select
          name="area"
          id="area"
          className="rounded-md input-field"
          {...register("area", { required: "Area is required" })}
          onChange={handleChange}
        >
          <option value="">Select Your Area</option>
          {divisions?.map((division) => (
            <option key={division.division} value={division.division}>
              {division.division}
            </option>
          ))}
        </select>
      </Field>
      <Field label="City" error={errors?.city} htmlFor="city">
        <select
          name="city"
          id="city"
          className="rounded-md input-field"
          {...register("city", { required: "City is required" })}
        >
          <option value="">Select Your City</option>
          <option value="Dhaka 1">Dhaka 1</option>
          <option value="Dhaka 1">Dhaka 1</option>
        </select>
      </Field>

      <Field label="Province" error={errors?.province} htmlFor="province">
        <select
          name="province"
          id="province"
          className="rounded-md input-field"
          {...register("province", { required: "Prvince is required" })}
        >
          <option value="">Select Your Province</option>
          <option value="Dhaka 1">Dhaka 1</option>
          <option value="Dhaka 1">Dhaka 1</option>
        </select>
      </Field>
      <Field
        label="Landmark(optional)"
        error={errors?.landmark}
        htmlFor="landmark"
      >
        <input
          type="text"
          placeholder="Enter landmark eg:(123, XYZ)"
          className="py-3 rounded-md input-field"
        />
      </Field>
      <Field label="Address" error={errors?.address} htmlFor="address">
        <textarea
          cols={40}
          rows={4}
          placeholder="Enter your address"
          className="overflow-y-auto rounded-md resize-none input-field"
          {...register("address", { required: "Address is required" })}
        />
      </Field>

      <div className="flex-end">
        <input
          type="submit"
          value="Submit"
          className="px-8 py-2.5 btn-shadow-with-hover-effect text-primary"
        />
      </div>
    </form>
  );
};
