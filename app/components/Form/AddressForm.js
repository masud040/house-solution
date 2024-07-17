"use client";
import { useForm } from "react-hook-form";
export const AddressForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <form onSubmit={onsubmit}>
      <input {...register("example")} />
    </form>
  );
};
