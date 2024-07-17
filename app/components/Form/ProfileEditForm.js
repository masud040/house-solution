"use client";
import { useForm } from "react-hook-form";
export const ProfileEditForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  return <form></form>;
};
