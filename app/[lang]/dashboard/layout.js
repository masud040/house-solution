import "@fortawesome/fontawesome-free/css/all.min.css";
import { Inter } from "next/font/google";

import "react-toastify/dist/ReactToastify.css";

import Greetings from "@/app/components/dashboard/Greetings";
import AdminSidebar from "@/app/components/shared/sidebar/AdminSidebar";
import ThemeProvider from "@/provider/ThemeProvider";
import { ToastContainer } from "react-toastify";
import "../../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Sokher Corner",
  description: "One place for by various products.",
  favicon: "/public/favicon.ico",
};

export default async function DashboardLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <div className="min-h-screen">
            <div className="flex">
              <AdminSidebar />
              <div className="flex-1 w-full mx-6 mt-4 mb-10 lg:mx-10">
                <Greetings />
                {children}
              </div>
            </div>
          </div>
          <ToastContainer />
        </ThemeProvider>
      </body>
    </html>
  );
}
