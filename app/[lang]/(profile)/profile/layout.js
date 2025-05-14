import "@fortawesome/fontawesome-free/css/all.min.css";
import { Inter } from "next/font/google";

import "react-toastify/dist/ReactToastify.css";

import Greetings from "@/app/components/dashboard/Greetings";
import Header from "@/app/components/shared/Header";
import Navbar from "@/app/components/shared/Navbar";
import AdminSideMenu from "@/app/components/shared/sidebar/AdminSidebarMenu";
import DashboardSidebar from "@/app/components/shared/sidebar/DashboardSidebar";
import UserSideMenu from "@/app/components/shared/sidebar/UserSidebarMenu";
import { checkIsAdmin } from "@/app/utils";
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
  const isAdmin = checkIsAdmin(user?.email);

  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <div className="min-h-screen mx-auto">
            {!isAdmin && (
              <div className="h-[142px] sticky top-0 w-full md:h-[152px]">
                <Header from="dashboard" />
                <Navbar from="dashboard" />
              </div>
            )}
            <div className="flex">
              <DashboardSidebar admin={isAdmin}>
                {!isAdmin ? <UserSideMenu /> : <AdminSideMenu />}
              </DashboardSidebar>
              <div className="flex-1 w-full">
                {isAdmin && (
                  <div className="h-[72px] sticky top-0 w-full">
                    <Greetings name={user?.name} />
                  </div>
                )}
                <div className="container py-10">{children}</div>
              </div>
            </div>
          </div>

          <ToastContainer />
        </ThemeProvider>
      </body>
    </html>
  );
}
