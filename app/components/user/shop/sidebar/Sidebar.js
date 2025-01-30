import { FilterByCategory } from "./FilterByCategory";
import { FilterByPrice } from "./FilterByPrice";
import FilterBySize from "./FilterBySize";

export default async function Sidebar({ categories }) {
  return (
    <div className="sticky hidden col-span-1 p-6 mx-auto overflow-hidden rounded shadow-light-elevated_dark-elevated-dark top-36 h-max md:block">
      <div className="space-y-5 divide-y dark:divide-tertiary/20">
        <FilterByCategory categories={categories} />
        <FilterByPrice />
        <FilterBySize />
      </div>
    </div>
  );
}
