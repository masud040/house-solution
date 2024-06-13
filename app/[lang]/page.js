import { getDictionary } from "@/dictionnaries/dictionaries";
import Banner from "../components/home/Banner";
import Categories from "../components/home/Categories";
import Features from "../components/home/Features";
import NewArrival from "../components/home/NewArrival";

export default async function Home({ params: { lang } }) {
  const dict = await getDictionary(lang);

  return (
    <>
      <Banner />
      <Features />
      <Categories />
      <NewArrival />
    </>
  );
}
