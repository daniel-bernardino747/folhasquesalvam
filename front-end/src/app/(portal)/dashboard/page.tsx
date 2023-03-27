"use client";
import { SignedIn, UserButton } from "@clerk/nextjs/app-beta/client";

export default function Home() {
  return (
    <main className="">
      <SignedIn>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>

      <p className="">Dashboard</p>
    </main>
  );
}
