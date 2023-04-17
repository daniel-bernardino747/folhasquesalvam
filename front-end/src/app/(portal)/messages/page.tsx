"use client";
import { AlertList } from "@/components";

export default function MembersPage() {
  return (
    <div className="h-screen">
      <div className="flex justify-between font-normal">
        <h1 className="text-4xl">Avisos</h1>
      </div>
      <AlertList />
    </div>
  );
}
