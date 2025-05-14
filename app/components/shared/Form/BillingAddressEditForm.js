"use client";

import useGetAllDivisions from "@/app/hooks/useGetAllDivisions";
import useMode from "@/app/hooks/useMode";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Field from "../Field";

export const BillingAddressEditForm = ({
  user,
  address,
  useFor,
  searchParams,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },

    setError,
    setValue,
  } = useForm();

  const allDivision = useGetAllDivisions();
  const [divisionId, setDivisionId] = useState("");
  const [districtId, setDistrictId] = useState("");
  const [districts, setDistricts] = useState([]);
  const [upazillas, setUpazillas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [globalError, setGlobalError] = useState("");
  const { theme } = useMode();
  const [addressData, setAddressData] = useState({
    area: address?.area ?? "default",
    city: address?.city ?? "default",
    province: address?.province ?? "default",
    landmark: address?.landmark ?? "",
    address: address?.address,
  });
  const router = useRouter();

  // run this effect for get all district based on area
  useEffect(() => {
    async function getDistrict() {
      if (divisionId) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BD_API}/district/${divisionId}`
        );
        const data = await res.json();
        if (data?.status === 200) {
          setDistricts(data.data);
        }
      }
    }
    getDistrict();
  }, [divisionId]);

  // run this effect for get all upazilla based on city
  useEffect(() => {
    async function getUpazilla() {
      if (districtId) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BD_API}/upazilla/${districtId}`
        );
        const data = await res.json();
        if (data?.status === 200) {
          setUpazillas(data.data);
        }
      }
    }
    getUpazilla();
  }, [divisionId, districtId]);

  // fill the form from existing data
  useEffect(() => {
    setDivisionId(
      allDivision?.find(
        (divisionData) => divisionData.name === addressData?.area
      )?.id
    );

    setDistrictId(
      districts?.find((district) => district.name === addressData?.city)?.id
    );
  }, [districts, allDivision]);

  // submit handeler
  async function onSubmit(data) {
    // set manual error
    // if (division === "default") {
    //   setError("area", {
    //     type: "manual",
    //     message: "Area is required!",
    //   });
    // }
    // if (district === "default") {
    //   setError("city", {
    //     type: "manual",
    //     message: "District is required!",
    //   });
    // }
    // if (province === "default") {
    //   setError("province", {
    //     type: "manual",
    //     message: "Province is required!",
    //   });
    // }

    try {
      setLoading(true); // Start loading
      const newData = {
        ...data,
        userId: user.id,
      };

      const { isUseShipping, ...rest } = newData;

      // if (useFor === "billing") {
      //   const res = await addAndUpdateBillingData(newData, user.id);
      //   if (res.success) {
      //     toast.success(res.message, {
      //       autoClose: 1500,
      //     });
      //     router.push("/account");
      //     reset();
      //   }
      // } else {
      //   const res = await addAndUpdateShippingData(rest, user.id);
      //   if (res.success) {
      //     toast.success(res.message, {
      //       autoClose: 1500,
      //     });
      //     if (searchParams?.selected && searchParams?.isCheckout) {
      //       router.push(`/en/checkout?selected=${searchParams?.selected}`);
      //     } else {
      //       router.push("/en/profile");
      //     }
      //     reset();
      //   }
      // }
    } catch (error) {
      console.log(error);
      setGlobalError(error.message);
    } finally {
      setLoading(false); // Stop loading
    }
  }
  // onChange handlers
  function handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setAddressData({
      ...addressData,
      [name]: value.trim(),
    });
  }

  function handleAddDivision(e) {
    if (e.target.value) {
      setDivisionId(
        allDivision?.find((division) => division.name === e.target.value)?.id
      );
      setAddressData({
        ...addressData,
        area: e.target.value,
        city: "default",
        province: "default",
      });
    }
  }
  function handleAddCity(e) {
    if (e.target.value) {
      setDistrictId(
        districts?.find((district) => district.name === e.target.value)?.id
      );
      setAddressData({
        ...addressData,
        city: e.target.value,
        province: "default",
      });
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="my-4">
      <Field label="Full Name" error={errors?.fullName} htmlFor="fullName">
        <input
          type="text"
          placeholder="Enter your full name"
          defaultValue={user?.name}
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
          type="number"
          placeholder="Enter your mobile number"
          className="py-3 rounded-md input-field"
          value={user?.mobile}
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
          {...register("area")}
          value={addressData?.area}
          onChange={handleAddDivision}
        >
          <option className="hidden" disabled value="default">
            Select Your Area
          </option>
          {allDivision?.length > 0 &&
            allDivision?.map((division) => (
              <option key={division.id} value={division.name}>
                {division.name}
              </option>
            ))}
        </select>
      </Field>
      <Field label="District" error={errors?.city} htmlFor="city">
        <select
          name="city"
          id="city"
          disabled={addressData?.area === "default"}
          title={addressData?.area === "default" && "First select your area"}
          className="rounded-md input-field disabled:cursor-not-allowed"
          {...register("city")}
          value={addressData?.city}
          onChange={handleAddCity}
        >
          <option className="hidden" disabled value="default">
            Select Your District
          </option>
          {districts?.length > 0 &&
            districts?.map((district) => (
              <option key={district.id} value={district.name}>
                {district.name}
              </option>
            ))}
        </select>
      </Field>

      <Field label="Province" error={errors?.province} htmlFor="province">
        <select
          name="province"
          id="province"
          className="rounded-md input-field disabled:cursor-not-allowed"
          disabled={addressData?.city === "default"}
          title={addressData?.city === "default" && "First select your city"}
          {...register("province")}
          value={addressData?.province}
          onChange={handleChange}
        >
          <option disabled className="hidden" value="default">
            Select Your Province
          </option>
          {upazillas?.length > 0 &&
            upazillas.map((upazilla) => (
              <option key={upazilla.id} value={upazilla.name}>
                {upazilla.name}
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
          {...register("landmark")}
          value={addressData?.landmark}
        />
      </Field>
      <Field label="Address" error={errors?.address} htmlFor="address">
        <textarea
          cols={40}
          rows={4}
          placeholder="Enter your address"
          className="overflow-y-auto rounded-md resize-none input-field"
          {...register("address", {
            required: "Address is required!",
          })}
          value={addressData?.address}
        />
      </Field>

      {useFor !== "shipping" && (
        <div className="flex items-center space-x-2">
          {/* Hidden Checkbox */}
          <input
            type="checkbox"
            {...register("isUseShipping")}
            id="isUseShipping"
            className="hidden peer"
            onChange={(e) => {
              const checked = e.target.checked;
              setValue("isUseShipping", checked); // <-- sync with RHF
            }}
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
              fill={theme === "dark" ? "#212428" : "currentColor"}
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </label>

          {/* Label Text */}
          <span>Use shipping address</span>
        </div>
      )}
      {!globalError && (
        <div className="my-3 font-medium text-primary">{globalError}</div>
      )}

      <div className="flex-end">
        <input
          type="submit"
          value={`${loading ? "Submitting..." : "Submit"}`}
          className="px-8 py-2.5 btn-shadow-with-hover-effect text-primary"
        />
      </div>
    </form>
  );
};
