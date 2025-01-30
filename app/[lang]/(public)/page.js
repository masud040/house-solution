import { getDictionary } from "@/dictionnaries/dictionaries";
import AddSection from "../../components/user/home/AddSection";
import Banner from "../../components/user/home/Banner";
import Categories from "../../components/user/home/Categories";
import Features from "../../components/user/home/Features";
import NewArrival from "../../components/user/home/NewArrival";
import TrendingProduct from "../../components/user/home/TrendingProduct";

export default async function Home({ params: { lang } }) {
  const dict = await getDictionary(lang);

  return (
    <>
      <Banner />
      <div className="container pt-10 pb-16">
        <Features />
        <Categories />
        <NewArrival />
        <AddSection />
        <TrendingProduct />
      </div>
    </>
  );
}
