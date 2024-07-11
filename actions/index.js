"use server";
import { signIn } from "@/auth";
import { updateCart } from "@/db/queries";
import { revalidatePath } from "next/cache";

export async function loginWithCredentials(formData) {
  try {
    const response = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    return response;
  } catch (err) {
    throw new Error(err?.cause?.err?.message);
  }
}

export async function toggleAddToCart(productId, userId) {
  try {
    await updateCart(productId, userId);
    revalidatePath("/");
  } catch (error) {
    throw new Error(error.message);
  }
}
