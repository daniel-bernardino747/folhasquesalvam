import { Goal, GoalList, Status } from "@/types";

export function updateGoalStatus(
  goals: Record<Status, GoalList>,
  goalId: string,
  newStatus: Status
): Record<Status, GoalList> {
  const allGoals = Object.values(goals).reduce(
    (prev: Goal[], current: GoalList) => {
      return [...prev, ...(current.list || [])];
    },
    []
  );

  const goal = allGoals.find((goal) => goal.id === +goalId);

  if (goal) {
    const updatedGoals = JSON.parse(JSON.stringify(goals));
    const prevColumn = goal.status === "REVIEW" ? "DONE" : goal.status;
    const newColumn = newStatus as "DO" | "PROGRESS" | "DONE";

    const prevList = updatedGoals[prevColumn].list as Goal[];
    const updatedList = updatedGoals[newColumn].list as Goal[];

    const filteredList = prevList.filter((t) => t.id !== +goalId);

    updatedGoals[prevColumn].list = filteredList;

    const updatedStatus = newStatus === "DONE" ? "REVIEW" : newStatus;

    goal.status = updatedStatus;

    updatedGoals[newColumn].list = [...updatedList, goal];

    return updatedGoals;
  }

  return goals;
}
