"use client";
import { use, useState } from "react";

import { UnauthorizatedError } from "@/errors";
import { getData } from "./fetch";
import { ColumnKanban } from "./Column";
import ErrorPage from "@/components/ErrorPage";
import { APIGoals, GoalList, Status } from "@/types";
import { mergeGoalsByStatus } from "./mergeGoalsByStatus";
import { updateGoalStatus } from "./updateGoalStatus";
import { useUserContext } from "@/contexts";
import { submitRequestGoals } from "./submitRequestGoals";

export function Kanban({ sessionId, userId }: KanbanProps) {
  const { user } = useUserContext();
  const { data, error }: APIGoals = use(getData({ sessionId, userId }));

  const [goals, setGoals] = useState<Record<Status, GoalList>>(() =>
    mergeGoalsByStatus(data || [])
  );

  if (error instanceof UnauthorizatedError) {
    return <div>Ocorreu um erro de autorização.</div>;
  }

  if (!data) {
    return <ErrorPage>Nenhum dado encontrado.</ErrorPage>;
  }

  if (data.length === 0) {
    submitRequestGoals(sessionId as string, user.member?.id as number);
  }

  const handleDrop = async (
    event: React.DragEvent<HTMLDivElement>,
    newStatus: Status
  ) => {
    event.preventDefault();

    const goalId = event.dataTransfer.getData("goalId");

    const updatedGoals = await updateGoalStatus(
      goals,
      goalId,
      newStatus,
      sessionId as string
    );

    setGoals(updatedGoals);
  };

  return (
    <div className="grid gap-4 pt-6 lg:grid-cols-3">
      {Object.entries(goals)
        .filter(([status]) => status !== "REVIEW")
        .map(([statusString, { list, title, color }]) => {
          const status = statusString as "DO" | "DONE" | "PROGRESS";
          return (
            <ColumnKanban
              key={status}
              color={color}
              data={list}
              setGoals={setGoals}
              handleDrop={handleDrop}
              labelName={title}
              statusDefault={status}
              canCreateCard={
                status === "DO" && user.member?.role === "DIRECTOR"
              }
            />
          );
        })}
    </div>
  );
}

interface KanbanProps {
  sessionId: string | null | undefined;
  isLoaded: boolean;
  isSignedIn: boolean | undefined;
  userId: string | null | undefined;
}
