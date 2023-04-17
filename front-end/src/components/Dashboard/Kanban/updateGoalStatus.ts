import { Goal, GoalList, Status } from "@/types";
import { patchGoalStatus } from "./fetch";
import Swal from "sweetalert2";

export async function updateGoalStatus(
  goals: Record<Status, GoalList>,
  goalId: string,
  newStatus: Status,
  sessionId: string
): Promise<Record<Status, GoalList>> {
  const allGoals = Object.values(goals).reduce(
    (prev: Goal[], current: GoalList) => {
      return [...prev, ...(current.list || [])];
    },
    []
  );

  const prevGoal = allGoals.find((goal) => goal.id === +goalId) as Goal;

  const requestBody = {
    status: newStatus === "DONE" ? "REVIEW" : newStatus,
  };

  const response = await patchGoalStatus({
    sessionId: sessionId as string,
    body: requestBody,
    goalId: +goalId,
  });
  try {
    if (response.error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: '<a href="">Why do I have this issue?</a>',
      });
    } else {
      const goal = response.data;
      console.log({ goal });

      const updatedGoals = JSON.parse(JSON.stringify(goals));
      const prevColumn =
        prevGoal.status === "REVIEW" ? "DONE" : prevGoal.status;

      const prevList = updatedGoals[prevColumn].list as Goal[];
      const filteredList = prevList.filter((t) => t.id !== +goalId);

      const newColumn = newStatus as "DO" | "PROGRESS" | "DONE";
      const updatedList = updatedGoals[newColumn].list as Goal[];

      updatedGoals[prevColumn].list = filteredList;
      updatedGoals[newColumn].list = [...updatedList, goal];

      return updatedGoals;
    }
  } catch (error) {
    console.error(error);
  }

  return goals;
}
