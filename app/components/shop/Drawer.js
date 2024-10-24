import { FilterByCategory } from "./sidebar/FilterByCategory";
import { FilterByPrice } from "./sidebar/FilterByPrice";
import FilterBySize from "./sidebar/FilterBySize";

export default function Drawer({ categories, showDrawer, setShowDrawer }) {
  return (
    <div
      className={`fixed inset-y-0 left-0 p-4 z-40 overflow-x-hidden bg-background-light dark:bg-background-dark w-80 transition duration-700 md:hidden ${
        showDrawer ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <h5
        id="drawer-label"
        className="inline-flex items-center mb-4 text-base font-semibold text-secondary dark:text-secondary-light"
      >
        <svg
          className="w-5 h-5 mr-2"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clip-rule="evenodd"
          ></path>
        </svg>
        Info
      </h5>
      <button
        onClick={() => setShowDrawer(false)}
        type="button"
        className="rounded-btn-with-inset-shadow absolute top-4 p-1 right-3.5"
      >
        <svg
          aria-hidden="true"
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"
          ></path>
        </svg>
        <span className="sr-only">Close menu</span>
      </button>
      <div className="space-y-5 divide-y divide-secondary-lighter">
        <FilterByCategory categories={categories} />
        <FilterByPrice />
        <FilterBySize />
      </div>
    </div>
  );
}
