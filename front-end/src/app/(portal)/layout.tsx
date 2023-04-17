"use client";
import { Inter } from "next/font/google";

import { ProSidebarProvider } from "react-pro-sidebar";
import { Header, SideBar } from "@/components";
import { UserProvider } from "@/contexts";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});
export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={inter.className}>
      <UserProvider>
        <ProSidebarProvider>
          <main
            className={
              "flex h-screen items-center justify-center bg-gradient-to-r from-[#305230] to-[#72AA63] p-10"
            }
          >
            <div className="container flex h-full rounded-xl bg-white shadow-xl">
              <SideBar />
              <div className="h-full w-full overflow-auto">
                <Header />
                <div className="px-8 pt-9">{children}</div>
              </div>
            </div>
          </main>
        </ProSidebarProvider>
      </UserProvider>
    </div>
  );
}
