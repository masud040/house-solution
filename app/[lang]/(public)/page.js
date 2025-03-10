import { auth } from "@/auth";
import { getUserByEmail } from "@/db/queries";
import { getDictionary } from "@/dictionnaries/dictionaries";
import { redirect } from "next/navigation";
import AddSection from "../../components/user/home/AddSection";
import Banner from "../../components/user/home/Banner";
import Categories from "../../components/user/home/Categories";
import Features from "../../components/user/home/Features";
import NewArrival from "../../components/user/home/NewArrival";
import TrendingProduct from "../../components/user/home/TrendingProduct";

export default async function Home({ params: { lang } }) {
  const dict = await getDictionary(lang);
  const session = await auth();
  const user = await getUserByEmail(session?.user?.email);
  if (user?.role === "admin") {
    redirect("/dashboard");
  }

  return (
    <>
      <Banner />
      <div className="container pt-6 pb-16">
        <Features />
        <Categories />
        <NewArrival />
        <AddSection />
        <TrendingProduct />
      </div>
    </>
  );
}
