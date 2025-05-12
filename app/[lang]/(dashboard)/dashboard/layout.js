import "@fortawesome/fontawesome-free/css/all.min.css";
import { Inter } from "next/font/google";

import "react-toastify/dist/ReactToastify.css";

import Greetings from "@/app/components/dashboard/Greetings";
import AdminSideMenu from "@/app/components/shared/sidebar/AdminSidebarMenu";
import DashboardSidebar from "@/app/components/shared/sidebar/DashboardSidebar";
import UserSideMenu from "@/app/components/shared/sidebar/UserSidebarMenu";
import { auth } from "@/auth";
import { getUserByEmail } from "@/db/queries";
import ThemeProvider from "@/provider/ThemeProvider";
import { ToastContainer } from "react-toastify";
import "../../../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Sokher Corner",
  description: "One place for by various products.",
  favicon: "/public/favicon.ico",
};

export default async function DashboardLayout({ children }) {
  const session = await auth();
  const user = await getUserByEmail(session?.user?.email);
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <div className="min-h-screen mx-auto">
            <div className="flex">
              <DashboardSidebar>
                {user?.email !== "masud@gmail.com" ? (
                  <UserSideMenu />
                ) : (
                  <AdminSideMenu />
                )}
              </DashboardSidebar>
              <div className="flex-1 w-full mx-6 mt-4 mb-10 lg:mx-10">
                <Greetings name={user?.name} />
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
