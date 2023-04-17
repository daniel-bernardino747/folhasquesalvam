"use client";
import { MemberList } from "@/components";

export default function MembersPage() {
  return (
    <div className="h-screen">
      <div className="flex justify-between font-normal">
        <h1 className="text-4xl">Members</h1>
      </div>
      <MemberList />
    </div>
  );
}
