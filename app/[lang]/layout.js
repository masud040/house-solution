import connectMongo from "@/db/connectMongo";
import ThemeProvider from "@/provider/ThemeProvider";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CopyRight from "../components/shared/CopyRight";
import Footer from "../components/shared/Footer";
import Header from "../components/shared/Header";
import Navbar from "../components/shared/Navbar";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Sokher Corner",
  description: "One place for by various products.",
  favicon: "/public/favicon.ico",
};

export default async function RootLayout({ children }) {
  await connectMongo();
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <div className="fixed z-30 w-full">
            <Header />
            <Navbar />
          </div>
          <div className="pt-[138px] min-h-[1000px]">{children}</div>
          <ToastContainer />
          <Footer />
          <CopyRight />
        </ThemeProvider>
      </body>
    </html>
  );
}
