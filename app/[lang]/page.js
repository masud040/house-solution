import { getDictionary } from "@/dictionnaries/dictionaries";

export default async function Home({ params: { lang } }) {
  const dict = await getDictionary(lang);
  return <div></div>;
}
