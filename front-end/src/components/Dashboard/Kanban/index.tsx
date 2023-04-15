"use client";
import { use, useState } from "react";

import { UnauthorizatedError } from "@/errors";
import { getData } from "./fetch";
import { ColumnKanban } from "./Column";
import ErrorPage from "@/components/ErrorPage";
import { APIGoals, Goal, Status } from "@/types";

export function Kanban({ sessionId, userId }: KanbanProps) {
  const { data, error }: APIGoals = use(getData({ sessionId, userId }));
  console.log({ data });

  const [goals, setGoals] = useState({
    DO: {
      list: data?.filter((goal) => goal.status === "DO"),
      title: "To Do",
      color: "#5030E5",
    },
    PROGRESS: {
      list: data?.filter((goal) => goal.status === "PROGRESS"),
      title: "In Progress",
      color: "#FFA500",
    },
    DONE: {
      list: data?.filter((goal) => ["DONE", "REVIEW"].includes(goal.status)),
      title: "Done",
      color: "#8BC48A",
    },
  });
  if (error instanceof UnauthorizatedError) {
    return <div>Ocorreu um erro de autorização.</div>;
  }

  if (!data || data?.length === 0) {
    return <ErrorPage>Nenhum dado encontrado.</ErrorPage>;
  }

  const handleDrop = (
    event: React.DragEvent<HTMLDivElement>,
    newStatus: Status
  ) => {
    event.preventDefault();
    const goalId = event.dataTransfer.getData("goalId");
    const goal = data.find((goal) => goal.id === +goalId);
    console.log("essa deveria ser a coluna que eu estou indo: ", newStatus);

    if (goal) {
      setGoals((prevGoals) => {
        const prevColum = goal.status === "REVIEW" ? "DONE" : goal.status;
        console.log("e essa de onde sai: ", prevColum);

        const updatedGoals = JSON.parse(JSON.stringify(prevGoals));

        const prevGoalsList = prevGoals[prevColum].list as Goal[];

        updatedGoals[prevColum].list = prevGoalsList.filter(
          (t) => t.id !== +goalId
        );
        console.log({ shouldBeEmpty: updatedGoals[prevColum].list });

        // goal.status = newStatus === "DONE" ? "REVIEW" : newStatus;

        const newColumn = newStatus as "DO" | "PROGRESS" | "DONE";

        const updatedGoal = prevGoals[newColumn].list as Goal[];

        updatedGoals[newColumn].list = [...updatedGoal, goal];
        console.log({ updatedGoals });
        return updatedGoals;
      });
    }
  };

  return (
    <div className="grid gap-4 pt-6 lg:grid-cols-3">
      {Object.entries(goals).map(([statusString, { list, title, color }]) => {
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
            canCreateCard={status === "DO"}
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
