import { getAllProducts } from "@/db/queries";
import { getDictionary } from "@/dictionnaries/dictionaries";

export default async function Home({ params: { lang } }) {
  const dict = await getDictionary(lang);
  const allProducts = await getAllProducts();
  console.log(allProducts);
  return <div></div>;
}
