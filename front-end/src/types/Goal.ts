export interface APIGoals {
  data?: Goal[];
  error?: unknown;
}
export interface Goal {
  id: number;
  title: string;
  description: string;
  status: Status;
  difficulty: Difficulty;
  deliveryDate: Date;
  createdAt: Date;
  updatedAt: Date;
  MemberGoal: {
    memberId: number;
  }[];
  label: Label;
}

export type Label =
  | "High"
  | "Medium"
  | "Low"
  | "Late"
  | "Urgent"
  | "Attention"
  | "No pressure"
  | "In review"
  | "Completed";

export type Difficulty = "Low" | "Medium" | "High";

export type Status = "DO" | "PROGRESS" | "REVIEW" | "DONE";

export interface GoalList {
  list: Goal[] | undefined;
  title: string;
  color: string;
}
