"use client";
import { useForm } from "react-hook-form";
import { Field } from "./Field";
export const ProfileEditForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  console.log(errors);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-100">
      <Field label="Full name" error={errors?.fullname} htmlFor="fullName">
        <input
          type="text"
          placeholder="Enter your first and last name"
          className="clear-right w-full text-sm rounded-sm focus:ring-0"
          {...register("fullname", {
            required: "Name is required",
            minLength: {
              value: 2,
              message: "Name must be at least 2 characters long",
            },
            maxLength: {
              value: 100,
              message: "Name must not exceed 100 characters",
            },
          })}
        />
      </Field>
      <input type="submit" value="Submit" />
    </form>
  );
};
