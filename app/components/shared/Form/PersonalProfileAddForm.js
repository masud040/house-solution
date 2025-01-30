"use client";
import { updateUserData } from "@/actions";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Field from "../Field";

export const PersonalProfileAddForm = ({ userId }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  async function handleUpdate(data) {
    try {
      const response = await updateUserData(data, userId);
      if (response?.status === 200) {
        toast.success("Name updated successfully!", { autoClose: 1500 });
        router.back();
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <form onSubmit={handleSubmit(handleUpdate)} className="my-4">
      <Field label="Full name" error={errors?.name} htmlFor="name">
        <input
          type="text"
          placeholder="Enter your full name"
          className="py-3 rounded-md input-field"
          {...register("name", {
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
      <div className="flex-end">
        <input
          type="submit"
          value="Save"
          className="px-8 py-2.5 btn-shadow-with-hover-effect text-primary"
        />
      </div>
    </form>
  );
};
