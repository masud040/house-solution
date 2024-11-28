"use client";
import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { AddNumberModal } from "../modal/AddNumberModal";
export default function AddNumberBtn({ userId }) {
  const [isShow, setIsShow] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsShow(true)}
        className="py-1.5 px-4 transition-all duration-500 ease-in-out rounded-2xl flex-start shadow-light-elevated_dark-elevated-dark hover:bg-primary hover:text-background-light"
      >
        <FiPlus className="text-2xl" /> <p>Add Number</p>
      </button>
      <AddNumberModal isOpen={isShow} setIsOpen={setIsShow} userId={userId} />
    </>
  );
}
