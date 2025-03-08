"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { ConfirmationModal } from "../../shared/modal/ConfirmationModal";

export default function SignInSignUp({ email }) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  return (
    <>
      {email ? (
        <button
          onClick={() => setIsOpenModal(true)}
          className="px-4 md:px-8 py-1.5 nav-link bg-primary text-white font-medium transition-transform duration-500 ease-in-out rounded  shadow-light-elevated_dark-elevated-dark hover:-translate-y-1 text-[12px] md:text-[14px]"
        >
          Logout
        </button>
      ) : (
        <Link
          href="/login"
          className="px-4 md:px-8 py-1.5 nav-link bg-primary text-white font-medium transition-transform duration-500 ease-in-out rounded shadow-light-elevated_dark-elevated-dark hover:-translate-y-1 md:text-[14px]"
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
