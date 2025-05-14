"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { ConfirmationModal } from "../modal/ConfirmationModal";
export default function DashboardSidebar({ children, admin }) {
  const [isShow, setIsShow] = useState(true);
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <>
      <div
        className={`${
          isShow ? `${admin ? "w-72" : "w-56"}` : "w-0"
        } relative transition-all duration-500 ease-in-out`}
      >
        <div
          className={`${
            isShow
              ? `${admin ? "w-72 " : "w-56 top-[142px] md:top-[152px]"}`
              : "w-0"
          } flex-column fixed h-full overflow-hidden bg-background-light dark:bg-background-dark transition-all duration-500 border-r dark:border-tertiary/20 ease-in-out`}
        >
          <div className="flex items-center justify-between p-5 border-b-light-default_dark-tertiary">
            {admin ? (
              <Link
                href={"/"}
                className="font-bold text-transparent h5-md-h4-medium bg-gradient-to-r from-primary-dark to-purple-800 bg-clip-text"
              >
                Sokher Corner
              </Link>
            ) : (
              <div className="py-2.5" />
            )}
          </div>

          {isShow && children}

          {isShow && (
            <div className="px-5 pb-10 mt-0 md:mt-auto">
              <button
                onClick={() => setIsOpenModal(true)}
                className="w-full px-8 py-3 bg-indigo-400 rounded-md btn-shadow-with-hover-effect text-background-light"
              >
                Logout
              </button>
            </div>
          )}
        </div>
        <button
          className={`fixed z-50 ${
            admin ? "top-5" : "top-[157px] md:top-[167px]"
          } ${
            isShow ? `${admin ? "left-[240px]" : "left-[170px]"}` : "left-2"
          } rounded-full p-1.5 text-2xl text-primary-light shadow-custom-inset transition-all duration-500 ease-in-out hover:scale-105 dark:shadow-custom-inset-dark`}
          onClick={() => setIsShow(!isShow)}
        >
          {isShow ? <FaChevronLeft /> : <FaChevronRight />}
        </button>
      </div>
      {isOpenModal && (
        <ConfirmationModal
          isOpen={isOpenModal}
          closeModal={setIsOpenModal}
          actionBtnLabel={"Confirm"}
          actionFuction={() => signOut()}
          confirmationLabel={"Are you sure want to log out?"}
        />
      )}
    </>
  );
}
