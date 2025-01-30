"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { ConfirmationModal } from "../modal/ConfirmationModal";

export default function SignInSignUp({ email }) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  return (
    <>
      {email ? (
        <button
          onClick={() => setIsOpenModal(true)}
          className="px-4 md:px-8 py-1.5 nav-link btn-shadow-with-hover-effect bg-primary text-white"
        >
          Logout
        </button>
      ) : (
        <Link
          href="/login"
          className="px-4 md:px-8 py-1.5 nav-link btn-shadow-with-hover-effect bg-primary text-white"
        >
          Login
        </Link>
      )}
      {isOpenModal && (
        <ConfirmationModal
          isOpen={isOpenModal}
          closeModal={setIsOpenModal}
          actionBtnLabel={"Confirm"}
          actionFuction={() => signOut()}
          confirmationLabel={"Are you sure want to log out?"}
        >
          <div>Hello I am from Modal</div>
        </ConfirmationModal>
      )}
    </>
  );
}
