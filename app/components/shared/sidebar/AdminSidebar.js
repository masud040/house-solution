"use client";

import { signOut } from "next-auth/react";
import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { ConfirmationModal } from "../modal/ConfirmationModal";

export default function AdminSidebar() {
  const [isShow, setIsShow] = useState(true);
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <>
      <div
        className={`${
          isShow ? "w-72" : "w-0"
        } relative z-50 transition-all duration-500 ease-in-out`}
      >
        <div
          className={`${
            isShow ? "w-72" : "w-0"
          } flex-column fixed h-full overflow-hidden border-r bg-background-light dark:bg-background-dark transition-all duration-500 dark:border-tertiary/20 ease-in-out`}
        >
          <div className="flex items-center justify-between p-5 border-b-light-default_dark-tertiary">
            <h1 className="font-bold text-transparent h5-md-h4-medium bg-gradient-to-r from-primary-dark to-purple-800 bg-clip-text">
              Sokher Corner
            </h1>
          </div>

          {isShow && (
            <ul className="flex flex-col gap-2 p-5 md:gap-3">
              {/* <CustomLink
              Icon={MdDashboard}
              title="Dashboard"
              target="/dashboard"
            />
            <CustomLink
              Icon={IoIosCreate}
              title="Add Blog"
              target="/add-blog"
            />
            <CustomLink
              Icon={GrProjects}
              title="Add Project"
              target="/add-project"
            />
            <CustomLink
              Icon={SiHyperskill}
              title="Add Skill"
              target="/my-skills"
            />
            <CustomLink
              Icon={FaServicestack}
              title="Add Service"
              target="/my-services"
            />
            <CustomLink
              Icon={MdRateReview}
              title="Add Testimonial"
              target="/add-testimonial"
            />
            <CustomLink
              Icon={SiBiome}
              title="Change Bio"
              target="/change-bio"
            />
            <CustomLink
              Icon={FaLink}
              title="Change Resume URL"
              target="/change-resume-url"
            />
            <CustomLink
              Icon={FaCloudUploadAlt}
              title="Generate Image Link"
              target="/upload-image"
              newTab={true}
            /> */}
              <li>Masud Rana</li>
              <li>Masud Rana</li>
              <li>Masud Rana</li>
            </ul>
          )}

          {isShow && (
            <div className="px-5 pb-10 mt-0 md:mt-auto">
              <button
                onClick={() => setIsOpenModal(true)}
                className="w-full px-8 py-3 border rounded-md border-primary-lighter btn-shadow-with-hover-effect"
              >
                Logout
              </button>
            </div>
          )}
        </div>
        <button
          className={`fixed top-5 ${
            isShow ? "left-[240px]" : "left-2"
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
