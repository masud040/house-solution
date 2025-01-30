import { updateUserData } from "@/actions";
import useMode from "@/app/hooks/useMode";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Field from "../Field";

export const AddNumberModal = ({ isOpen, setIsOpen, userId }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const { theme } = useMode();
  function closeModal() {
    setIsOpen(false);
  }
  async function handleUpdate(data) {
    try {
      const response = await updateUserData(data, userId);
      if (response?.status === 200) {
        toast.success("Mobile added successfully!", { autoClose: 1500 });
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
                    ? "bg-background-dark text-background-light"
                    : "bg-background-light text-background-dark"
                } rounded-2xl`}
              >
                <form onSubmit={handleSubmit(handleUpdate)}>
                  <Field
                    label="Mobile Number"
                    htmlFor="number"
                    error={errors?.number}
                  >
                    <input
                      type="number"
                      id="number"
                      className={`w-full font-medium transition-colors duration-500 ease-in-out bg-transparent border rounded-md border-transparent py-3 ${
                        theme === "dark"
                          ? "shadow-custom-inset-dark"
                          : "shadow-custom-inset"
                      } focus:border-primary focus:outline-none focus:ring-0`}
                      placeholder="Enter your mobile number"
                      {...register("mobile", {
                        required: "Mobile number is required!",
                        minLength: {
                          value: 11,
                          message: "Mobile number cannot exceed 11 digits",
                        },
                        maxLength: {
                          value: 14,
                          message: "Mobile number cannot exceed 11 digits",
                        },
                      })}
                    />
                  </Field>

                  <div className="flex justify-end gap-4 mt-4">
                    <button
                      type="button"
                      className="px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 text-sm font-medium text-blue-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
