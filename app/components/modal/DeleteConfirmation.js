import { performDelete } from "@/actions";
import useMode from "@/app/hooks/useMode";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { toast } from "react-toastify";

export const DeleteConfirmation = ({
  isOpen,
  setIsOpen,
  productId = undefined,
  from,
}) => {
  const { theme } = useMode();

  function closeModal() {
    setIsOpen(false);
  }
  async function handleDelete() {
    try {
      const response = await performDelete(productId, from);
      if (response?.status === 200) {
        toast.success(response.message, { autoClose: 1500 });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsOpen(false);
    }
  }
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
                className={`w-full max-w-md p-5 overflow-hidden text-left align-middle transition-all transform shadow-xl ${
                  theme === "dark"
                    ? "bg-background-dark"
                    : "bg-background-light"
                } rounded-2xl`}
              >
                <div className="space-y-1 ">
                  <h3
                    className={`text-lg ${
                      theme === "dark"
                        ? "text-secondary-light"
                        : "text-background-dark"
                    } font-medium`}
                  >
                    Are you sure?
                  </h3>
                  <p
                    className={`text-sm ${
                      theme === "dark"
                        ? "text-secondary-light"
                        : "text-background-dark"
                    } font-medium`}
                  >
                    Items will be remove from your cart
                  </p>
                </div>

                <div className="flex justify-end gap-4 mt-4">
                  <button
                    type="button"
                    className="px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="px-4 py-2 text-sm font-medium text-blue-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  >
                    Remove
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
