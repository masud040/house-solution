import useMode from "@/app/hooks/useMode";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

export const ConfirmationModal = ({
  isOpen,
  closeModal,
  actionFuction,
  actionBtnLabel,
  confirmationLabel,
  confirmationSubLabel,
}) => {
  const { theme } = useMode();

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => {}}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-full p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={`w-full max-w-sm space-y-6 p-6 overflow-hidden text-left align-middle transition-all transform shadow-xl ${
                  theme === "dark"
                    ? "bg-background-dark"
                    : "bg-background-light"
                } rounded-2xl`}
              >
                <div className="space-y-1">
                  <h3
                    className={`text-lg ${
                      theme === "dark"
                        ? "text-secondary-light"
                        : "text-background-dark"
                    } font-medium`}
                  >
                    {confirmationLabel ?? "Are you sure?"}
                  </h3>
                  <p
                    className={`text-sm ${
                      theme === "dark"
                        ? "text-secondary-light"
                        : "text-background-dark"
                    } font-medium`}
                  >
                    {confirmationSubLabel}
                  </p>
                </div>

                <div className="flex justify-end gap-4 pt-6">
                  <button
                    type="button"
                    className="px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={() => closeModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={actionFuction}
                    className="px-4 py-2 text-sm font-medium text-blue-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  >
                    {actionBtnLabel}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
