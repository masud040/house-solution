import "@fortawesome/fontawesome-free/css/all.min.css";
import { Inter } from "next/font/google";

import "react-toastify/dist/ReactToastify.css";

import CopyRight from "@/app/components/shared/CopyRight";
import Footer from "@/app/components/shared/Footer";
import Header from "@/app/components/shared/Header";
import Navbar from "@/app/components/shared/Navbar";
import connectMongo from "@/db/connectMongo";
import ThemeProvider from "@/provider/ThemeProvider";
import { ToastContainer } from "react-toastify";
import "../../globals.css";

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
          <div className="pt-[135px] md:pt-[146px] min-h-screen">
            {children}
          </div>
          <ToastContainer />
          <Footer />
          <CopyRight />
        </ThemeProvider>
      </body>
    </html>
  );
}
