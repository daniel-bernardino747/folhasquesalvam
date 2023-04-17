"use client";
import { APIMembers, getAllMembers } from "@/app/(portal)/dashboard/fetch";

import { Member, Role } from "@/types";
import { useAuth } from "@clerk/nextjs";
import Image from "next/image";
import { use, useState } from "react";
import ErrorPage from "../ErrorPage";
import { useRouter } from "next/navigation";

export function MemberList() {
  const authProps = useAuth();
  const router = useRouter();

  function redirectToProfilePage(idUser: number) {
    router.push(`/members/${idUser}`);
  }

  const { sessionId } = authProps;
  const { data, error }: APIMembers = use(getAllMembers(sessionId));

  const [members] = useState<Member[] | undefined>(data);
  if (error) {
    return <ErrorPage>Tivemos um erro</ErrorPage>;
  }
  if (!members) {
    return <>Não tem membros ainda</>;
  }

  return (
    <table className="w-full table-auto border-collapse pt-6">
      <thead>
        <tr>
          <th className="px-2 pb-4 pt-6 text-left font-normal text-gray-500">
            Foto
          </th>
          <th className="pb-4 pt-6 text-left font-normal text-gray-500">
            Nome
          </th>
          <th className="pb-4 pt-6 text-left font-normal text-gray-500">
            Cargo
          </th>
          <th className="pb-4 pt-6 text-left font-normal text-gray-500">
            Folhas à
          </th>
        </tr>
      </thead>
      <tbody>
        {members.map((member: Member) => {
          return (
            <tr
              key={member.id}
              className="border-t border-transparent border-gray-300 hover:cursor-pointer hover:bg-gray-100"
              onClick={() => redirectToProfilePage(member.id)}
            >
              <td className="py-3 px-2">
                <Image
                  src={member.profileImageUrl}
                  width={40}
                  height={40}
                  className="rounded-md"
                  alt={`image-profile-${member.profileImageUrl}`}
                />
              </td>
              <td>{member.name}</td>
              <td>{roleTranslations[member.role]}</td>
              <td>{formatDateSinceCreation(member.createdAt)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
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

function formatDateSinceCreation(createdAt: string) {
  const currentDate = new Date();
  const createdAtDate = new Date(createdAt);

  const diffMilliseconds = currentDate.getTime() - createdAtDate.getTime();
  const diffSeconds = Math.floor(diffMilliseconds / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffMonths / 12);

  if (diffYears > 0) {
    return `${diffYears} ano${diffYears > 1 ? "s" : ""}`;
  } else if (diffMonths > 0) {
    return `${diffMonths} m${diffMonths > 1 ? "eses" : "ês"}`;
  } else if (diffDays > 0) {
    return `${diffDays} dia${diffDays > 1 ? "s" : ""}`;
  } else {
    return "hoje";
  }
}
