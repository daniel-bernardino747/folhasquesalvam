"use client";
import { ProSidebarProvider } from "react-pro-sidebar";
import { SideBar } from "./SideBar";
import { SignedIn, UserButton } from "@clerk/nextjs/app-beta/client";
import { Suspense } from "react";
import Loading from "@/app/loading";

import { Kanban } from "@/components/KanBan";

export function Dashboard() {
  return (
    <ProSidebarProvider>
      <div className="flex h-full">
        <SideBar />
        <div>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>

          <Suspense fallback={<Loading />}>
            <Kanban />
          </Suspense>
        </div>
      </div>
    </ProSidebarProvider>
  );
}
