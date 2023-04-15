import "animate.css";

import { ButtonCreateCard, FormCreateCard } from "@/components";
import { useToggle } from "react-use";
import { APIMembers, getAllMembers } from "@/app/(portal)/dashboard/fetch";
import { useAuth } from "@clerk/nextjs";
import { use } from "react";

export function useCreateCard(color: string, setData: any) {
  const { sessionId } = useAuth();
  const { data }: APIMembers = use(getAllMembers(sessionId));
  const useHook = useToggle(false);
  return {
    createCardComponent: <ButtonCreateCard color={color} useToggle={useHook} />,
    cardInputComponent: (
      <FormCreateCard
        useToggle={useHook}
        color={color}
        members={data}
        setData={setData}
      />
    ),
  };
}
