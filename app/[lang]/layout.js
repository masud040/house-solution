import connectMongo from "@/db/connectMongo";
import "@fortawesome/fontawesome-free/css/all.min.css";
import CopyRight from "../components/shared/CopyRight";
import Footer from "../components/shared/Footer";
import Header from "../components/shared/Header";
import Navbar from "../components/shared/Navbar";
import "../globals.css";

export const metadata = {
  title: "LWSKart",
  description: "One place for by various products.",
  favicon: "../../public/favicon.ico",
};

export default async function RootLayout({ children }) {
  await connectMongo();
  return (
    <html lang="en">
      <body>
        <Header />
        <Navbar />
        <div>{children}</div>
        <Footer />
        <CopyRight />
      </body>
    </html>
  );
}
