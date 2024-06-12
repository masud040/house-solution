import { getAllProducts } from "@/db/queries";
import { getDictionary } from "@/dictionnaries/dictionaries";
import Banner from "../components/home/Banner";
import Features from "../components/home/Features";

export default async function Home({ params: { lang } }) {
  const dict = await getDictionary(lang);
  const allProducts = await getAllProducts();

  return (
    <>
      <Banner />
      <Features />
    </>
  );
}
