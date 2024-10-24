import connectMongo from "@/db/connectMongo";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CopyRight from "../components/shared/CopyRight";
import Footer from "../components/shared/Footer";
import Header from "../components/shared/Header";
import Navbar from "../components/shared/Navbar";
import "../globals.css";

export const metadata = {
  title: "Sokher Corner",
  description: "One place for by various products.",
  favicon: "/public/favicon.ico",
};

export default async function RootLayout({ children }) {
  await connectMongo();
  return (
    <html lang="en">
      <body className="light">
        <div className="fixed z-30 w-full">
          <Header />
          <Navbar />
        </div>
        <div className="pt-36">{children}</div>
        <ToastContainer />
        <Footer />
        <CopyRight />
      </body>
    </html>
  );
}
