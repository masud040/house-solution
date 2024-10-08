"use server";
import { auth, signIn } from "@/auth";
import {
  deleteItems,
  getUserByEmail,
  moveToCart,
  setItemInCart,
  updateQuantity,
  updateWishlist,
} from "@/db/queries";
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

// add to cart if already existing update is quantity
export async function addToCart(productId, userId, quantity) {
  try {
    const cartData = {
      productId,
      quantity,
      userId,
    };
    const response = await setItemInCart(cartData);
    revalidatePath("/");
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}

// add to wishlist if already added to wishlist remove from wishlist
export async function performAddWishlist(productId, userId) {
  try {
    await updateWishlist(productId, userId);
    revalidatePath("/");
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function updateProductQuantity(productId, userId, type) {
  try {
    const response = await updateQuantity(productId, userId, type);
    if (response?.status === 200) {
      revalidatePath("/cart");
      return response;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function performDelete(productId, from) {
  try {
    const session = await auth();
    const user = await getUserByEmail(session?.user?.email);
    const response = await deleteItems(productId, user?.id, from);
    if (response.status === 200) {
      if (from === "cart" || from === "all") {
        revalidatePath("/cart");
      }
      if (from === "wishlist") {
        revalidatePath("/wishlist");
      }
    }
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function handleMovingToCart(productId) {
  try {
    const session = await auth();
    const user = await getUserByEmail(session?.user?.email);
    const response = await moveToCart(productId, user?.id);
    if (response.status === 200) {
      revalidatePath("/");
    }
    return response;
  } catch (error) {
    console.log(error);
  }
}
