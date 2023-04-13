"use client";
import { use, useState } from "react";
import clsx from "clsx";

import { UnauthorizatedError } from "@/errors";
import { getData } from "./fetch";
import { ColumnKanban } from "./Column";

export function Kanban({ sessionId }: KanbanProps) {
  const { data, error }: APIGoals = use(getData(sessionId));

  const [tasks, setTasks] = useState({
    DO: {
      list: test.filter((task) => task.status === "DO"),
      title: "To Do",
      color: "#5030E5",
    },
    PROGRESS: {
      list: test.filter((task) => task.status === "PROGRESS"),
      title: "In Progress",
      color: "#FFA500",
    },
    DONE: {
      list: test.filter((task) => task.status === "DONE"),
      title: "Done",
      color: "#8BC48A",
    },
  });

  if (error instanceof UnauthorizatedError) {
    return <div>Ocorreu um erro de autorização.</div>;
  }

  // if (!data || data?.length === 0) {
  //   return <ErrorPage>Nenhum dado encontrado.</ErrorPage>;
  // }

  const handleDrop = (
    event: React.DragEvent<HTMLDivElement>,
    newStatus: "DO" | "PROGRESS" | "DONE"
  ) => {
    event.preventDefault();
    const taskId = event.dataTransfer.getData("taskId");
    const task = test.find((task) => task.id === +taskId);

    if (task) {
      setTasks((prevTasks) => {
        const updatedTasks = { ...prevTasks };

        updatedTasks[task.status].list = prevTasks[task.status].list.filter(
          (t) => t.id !== +taskId
        );

        task.status = newStatus;
        updatedTasks[task.status].list = [...prevTasks[task.status].list, task];
        return updatedTasks;
      });
    }
  };

  return (
    <div className="grid gap-4 pt-6 lg:grid-cols-3">
      {Object.entries(tasks).map(([statusString, { list, title, color }]) => {
        const status = statusString as "DO" | "DONE" | "PROGRESS";
        return (
          <ColumnKanban
            key={status}
            color={color}
            data={list}
            handleDrop={handleDrop}
            labelName={title}
            statusDefault={status}
          />
        );
      })}
    </div>
  );
}

interface APIGoals {
  data?: string[];
  error?: unknown;
}
interface KanbanProps {
  sessionId: string | null | undefined;
  isLoaded: boolean;
  isSignedIn: boolean | undefined;
}
interface Task {
  id: number;
  name: string;
  status: "DO" | "PROGRESS" | "DONE";
  description: string;
  label: string;
}
const test: Task[] = [
  {
    id: 1,
    name: "Brainstorming1",
    status: "PROGRESS",
    label: "Test",
    description: "bla sikjda çaldk isjdak aisjdis sjad dijsm sks sij sdsd",
  },
  {
    id: 2,
    name: "Brainstorming2",
    status: "PROGRESS",
    label: "Test",
    description: "bla sikjda çaldk isjdak aisjdis sjad dijsm sks sij sdsd",
  },
  {
    id: 3,
    name: "Brainstorming3",
    status: "DONE",
    label: "Test",
    description: "bla sikjda çaldk isjdak aisjdis sjad dijsm sks sij sdsd",
  },
  {
    id: 4,
    name: "Brainstorming4",
    status: "DO",
    label: "Test",
    description: "bla sikjda çaldk isjdak aisjdis sjad dijsm sks sij sdsd",
  },
];
