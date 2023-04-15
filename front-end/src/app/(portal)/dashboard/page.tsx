"use client";
import { use } from "react";

import { Kanban, ViewMembers } from "@/components";
import { useAuth } from "@clerk/nextjs";
import { APIMembers, getAllMembers } from "./fetch";

export default function Dashboard() {
  const authProps = useAuth();
  const { sessionId } = authProps;
  const { data, error }: APIMembers = use(getAllMembers(sessionId));

  return (
    <div className="h-screen">
      <div className="flex justify-between font-normal">
        <h1 className="text-4xl">Dashboard</h1>
        <ViewMembers data={data} />
      </div>
      <Kanban {...authProps} />
    </div>
  );
}
