import { getAllCategory } from "@/db/queries";
import CategoryCard from "../card/CategoryCard";

export default async function Categories() {
  const allCategory = await getAllCategory();
  return (
    <div className="container py-16">
      <h2 className="mb-6 text-2xl font-medium text-gray-800 uppercase">
        shop by category
      </h2>
      <div className="grid grid-cols-3 gap-3">
        {allCategory?.map((category) => (
          <CategoryCard key={category.id} categoryData={category} />
        ))}
      </div>
    </div>
  );
}
