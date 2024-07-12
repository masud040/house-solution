"use server";
import { signIn } from "@/auth";
import { setItemInCart, updateWishlist } from "@/db/queries";
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

export async function addToCart(productId, userId, quantity) {
  try {
    const cartData = {
      productId,
      quantity,
      userId,
    };
    const updateCart = await setItemInCart(cartData);
    revalidatePath("/");
    return updateCart;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function toggleWishList(productId, userId) {
  try {
    await updateWishlist(productId, userId);
    revalidatePath("/");
  } catch (error) {
    throw new Error(error.message);
  }
}
