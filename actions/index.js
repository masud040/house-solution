"use server";
import { auth, signIn } from "@/auth";
import { getUserByEmail } from "@/db/queries";

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

export async function handleAddToCart(quantity) {
  try {
    const response = await auth();
    if (response?.user?.email) {
      const user = await getUserByEmail(response?.user?.email);
      return user;
    } else {
      return null;
    }
  } catch (error) {
    throw new Error(error);
  }
}
