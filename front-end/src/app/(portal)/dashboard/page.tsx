import { Dashboard } from "@/components/Dashboard";

export default function Home() {
  return (
    <main className="flex h-screen items-center justify-center bg-gradient-to-r from-[#305230] to-[#72AA63] p-10">
      <div className="container h-full rounded-xl bg-white shadow-xl">
        <Dashboard />
      </div>
    </main>
  );
}
