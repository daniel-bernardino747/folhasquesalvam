import { Goal, GoalList, Status } from "@/types";

export function mergeGoalsByStatus(goals: Goal[]): Record<Status, GoalList> {
  return {
    DO: {
      list: filterGoalsByStatus(goals, "DO"),
      title: "To Do",
      color: "#5030E5",
    },
    PROGRESS: {
      list: filterGoalsByStatus(goals, "PROGRESS"),
      title: "In Progress",
      color: "#FFA500",
    },
    DONE: {
      list: filterGoalsByStatus(goals, "DONE").concat(
        filterGoalsByStatus(goals, "REVIEW")
      ),
      title: "Done",
      color: "#8BC48A",
    },
    REVIEW: {
      list: filterGoalsByStatus(goals, "REVIEW"),
      title: "Review",
      color: "#cccccc",
    },
  };
}
function filterGoalsByStatus(goals: Goal[], status: Status): Goal[] {
  return goals.filter((goal) => goal.status === status);
}
