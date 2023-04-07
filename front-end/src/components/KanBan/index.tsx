"use client";
import { UnauthorizatedError } from "@/errors";
import { useAuth } from "@clerk/nextjs";
import { use } from "react";
import { SideBar } from "../Dashboard/SideBar";
import { getData } from "./fetch";

interface APIGoals {
  data?: string[];
  error?: unknown;
}

export function Kanban() {
  const { sessionId, isLoaded, isSignedIn } = useAuth();
  const { data, error }: APIGoals = use(getData(sessionId));
  console.log({ data });

  if (!isLoaded || !isSignedIn) {
    return <div>Carregando...</div>;
  }

  if (error instanceof UnauthorizatedError) {
    return <div>Ocorreu um erro de autorização.</div>;
  }

  if (!data || data?.length === 0) {
    return <div>Nenhum dado encontrado.</div>;
  }

  return (
    <>
      <h1>Kanban - Dashboard</h1>
      {data?.map((item: any) => (
        <div key={item.id}>{item.id}</div>
      ))}
    </>
  );
}
