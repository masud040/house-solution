import { getAllCategory } from "@/db/queries";
import CategoryCard from "../../shared/card/CategoryCard";
import SectionTitle from "../../shared/SectionTitle";

export default async function Categories() {
  const allCategory = await getAllCategory();
  return (
    <div className="mb-14">
      <SectionTitle name="shop by category" />
      <div className="grid grid-cols-2 gap-8 lg:grid-cols-3">
        {allCategory?.map((category) => (
          <CategoryCard key={category.id} categoryData={category} />
        ))}
      </div>
    </div>
  );
}
