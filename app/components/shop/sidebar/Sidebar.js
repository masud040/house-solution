import { FilterByCategory } from "./FilterByCategory";
import { FilterByPrice } from "./FilterByPrice";
import FilterBySize from "./FilterBySize";

export default async function Sidebar({ categories }) {
  return (
    <div className="hidden col-span-1 px-4 pb-6 bg-white rounded shadow overflow-hiddenb md:block">
      <div className="space-y-5 divide-y divide-gray-200">
        <FilterByCategory categories={categories} />
        <FilterByPrice />
        <FilterBySize />
      </div>
    </div>
  );
}
