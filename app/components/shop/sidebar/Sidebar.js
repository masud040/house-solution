import { FilterByCategory } from "./FilterByCategory";
import { FilterByPrice } from "./FilterByPrice";
import FilterBySize from "./FilterBySize";

export default async function Sidebar({ categories }) {
  return (
    <div className="hidden col-span-1 p-4 mx-auto overflow-hidden rounded shadow bg-background-light h-max md:block">
      <div className="space-y-5 divide-y divide-gray-200">
        <FilterByCategory categories={categories} />
        <FilterByPrice />
        <FilterBySize />
      </div>
    </div>
  );
}
