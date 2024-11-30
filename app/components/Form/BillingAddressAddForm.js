"use client";
import { addAndUpdateBillingData } from "@/actions";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Field from "../shared/Field";

export const BillingAddressAddForm = ({ user, billingAddress }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    setValue,
    setError,
  } = useForm();

  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [upazillas, setUpazillas] = useState([]);
  const [billingAddressData, setBillingAddressData] = useState({
    fullName: billingAddress?.fullName ?? user.name ?? "",
    mobile: billingAddress?.mobile ?? "",
    area: billingAddress?.area ?? "",
    city: billingAddress?.city ?? "",
    province: billingAddress?.province ?? "",
    landmark: billingAddress?.landmark ?? "",
    address: billingAddress?.address ?? "",
    isUseShipping: billingAddress?.isUseShipping ?? false,
  });

  const router = useRouter();
  useEffect(() => {
    async function getDivision() {
      const res = await fetch(`https://bdapis.com/api/v1.2/divisions`);
      const data = await res.json();
      if (data?.status?.code === 200 && data?.status?.message === "ok") {
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
      if (data?.status?.code === 200 && data?.status?.message === "ok") {
        setDistricts(data.data);
        setBillingAddressData({
          ...billingAddressData,
          city: "",
          province: "",
        });
      }
    }
    getCity();
  }, [billingAddressData?.area]);
  useEffect(() => {
    async function getUpazilla() {
      const res = await fetch(
        `https://bdapis.com/api/v1.2/district/${billingAddressData?.city}`
      );
      const data = await res.json();
      console.log(data);
      if (data?.status?.code === 200 && data?.status?.message === "ok") {
        setUpazillas(data?.data[0].upazillas);
        setBillingAddressData({
          ...billingAddressData,

          province: billingAddress?.province || "",
        });
      }
    }
    getUpazilla();
  }, [billingAddressData.city, billingAddressData.area]);

  async function onSubmit(data) {
    if (!billingAddressData.area) {
      setError("area", { type: "manual", message: "Area is required" });
    }
    if (!billingAddressData.city) {
      setError("city", { type: "manual", message: "City is required" });
    }
    if (!billingAddressData.province) {
      setError("province", { type: "manual", message: "Province is required" });
    }
    try {
      const newData = {
        ...billingAddressData,
        userId: user.id,
        landmark: parseFloat(billingAddressData.landmark),
      };
      // console.log(newData);
      // return;
      const res = await addAndUpdateBillingData(newData, billingAddress?._id);
      if (res.success) {
        toast.success(res.message, {
          autoClose: 1500,
        });
        router.push("/account");
        reset();
      }
    } catch (error) {
      console.log(error);
    }
  }
  function handleChange(e) {
    const { name, value, checked } = e.target;

    setBillingAddressData({
      ...billingAddressData,
      [name]: name === "isUseShipping" ? checked : value.trim(),
    });
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
          onChange={handleChange}
        />
      </Field>
      <Field label="Mobile" error={errors?.mobile} htmlFor="mobile">
        <input
          type="text"
          placeholder="Enter your mobile number"
          className="py-3 rounded-md input-field"
          defaultValue={billingAddressData?.mobile}
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
          onChange={handleChange}
        />
      </Field>

      <Field label="Area" error={errors?.area} htmlFor="area">
        <select
          name="area"
          id="area"
          className="rounded-md input-field"
          value={billingAddressData?.area}
          onChange={handleChange}
        >
          <option value="">Select Your Area</option>
          {divisions?.length > 0 &&
            divisions?.map((division) => (
              <option key={division.division} value={division.division}>
                {division.division}
              </option>
            ))}
        </select>
      </Field>
      <Field label="District" error={errors?.city} htmlFor="city">
        <select
          name="city"
          id="city"
          disabled={!billingAddressData.area}
          title={!billingAddressData.area && "First select your area"}
          className="rounded-md input-field disabled:cursor-not-allowed"
          value={billingAddressData?.city}
          onChange={handleChange}
        >
          <option value="">Select Your District</option>
          {districts?.length > 0 &&
            districts?.map((district) => (
              <option key={district.district} value={district.district}>
                {district.district}
              </option>
            ))}
        </select>
      </Field>

      <Field label="Province" error={errors?.province} htmlFor="province">
        <select
          name="province"
          id="province"
          className="rounded-md input-field disabled:cursor-not-allowed"
          disabled={!billingAddressData.city}
          title={!billingAddressData.city && "First select your city"}
          value={billingAddressData?.province}
          onChange={handleChange}
        >
          <option value="">Select Your Province</option>
          {upazillas?.length > 0 &&
            upazillas.map((upazilla) => (
              <option key={upazilla} value={upazilla}>
                {upazilla}
              </option>
            ))}
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
          defaultValue={billingAddressData?.landmark}
          {...register("landmark")}
          onChange={handleChange}
        />
      </Field>
      <Field label="Address" error={errors?.address} htmlFor="address">
        <textarea
          cols={40}
          rows={4}
          placeholder="Enter your address"
          defaultValue={billingAddressData?.address}
          className="overflow-y-auto rounded-md resize-none input-field"
          {...register("address", { required: "Address is required" })}
          onChange={handleChange}
        />
      </Field>

      <div className="flex items-center space-x-2">
        {/* Hidden Checkbox */}
        <input
          type="checkbox"
          {...register("isUseShipping")}
          id="isUseShipping"
          className="hidden peer"
          onChange={handleChange}
          defaultChecked={billingAddressData.isUseShipping}
        />

        {/* Custom Label */}
        <label
          htmlFor="isUseShipping"
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

        {/* Label Text */}
        <span className="text-gray-700">Use shipping address</span>
      </div>

      <div className="flex-end">
        <input
          type="submit"
          value={billingAddress?._id ? "Save" : "Submit"}
          className="px-8 py-2.5 btn-shadow-with-hover-effect text-primary"
        />
      </div>
    </form>
  );
};
