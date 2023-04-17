"use client";
import { useAuth } from "@clerk/nextjs";
import { use } from "react";
import { GetMemberAPI, getMember } from "./fetch";
import Image from "next/image";
import ErrorPage from "@/components/ErrorPage";

export default function UserProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const { sessionId } = useAuth();
  const { data }: GetMemberAPI = use(getMember(sessionId, params.id));

  if (!data) {
    return <ErrorPage>Usuário não encontrado</ErrorPage>;
  }

  return (
    <div className="h-screen">
      <div className="flex font-normal">
        <Image
          src={data.profileImageUrl}
          alt="profile-photo"
          className="rounded-full border border-gray-200"
          width={150}
          height={150}
        />
        <div className="pt-16 pl-6">
          <h1 className="text-4xl">{data.name}</h1>
          <h2 className="text-xl">{roleTranslations[data.role]}</h2>
        </div>
      </div>
      <div className="py-10">
        <span className="text-gray-500">
          Por enquanto só mostraremos esses dados.
        </span>
      </div>
    </div>
  );
}
const roleTranslations = {
  USER: "Usuário",
  DIRECTOR: "Diretor",
  TEAM: "Time",
  LEADER: "Líder",
  AMBASSADOR: "Embaixador",
  ALUMNI: "Alumni",
};
