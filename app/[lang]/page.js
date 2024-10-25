import { getDictionary } from "@/dictionnaries/dictionaries";
import AddSection from "../components/home/AddSection";
import Banner from "../components/home/Banner";
import Categories from "../components/home/Categories";
import Features from "../components/home/Features";
import NewArrival from "../components/home/NewArrival";
import TrendingProduct from "../components/home/TrendingProduct";

export default async function Home({ params: { lang } }) {
  const dict = await getDictionary(lang);

  return (
    <>
      <Banner />
      <div className="container">
        <Features />
        <Categories />
        <NewArrival />
        <AddSection />
        <TrendingProduct />
      </div>
    </>
  );
}
