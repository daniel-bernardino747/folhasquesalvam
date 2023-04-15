import { api } from "@/config/api";
import { UnauthorizatedError } from "@/errors";

interface CreateGoalDto {
  title: string;
  description: string;
  membersIds: {
    memberId: number;
  }[];
  deliveryDate: Date;
  status?: "DO" | "DONE" | "PROGRESS" | "REVIEW";
  difficulty?: "LOW" | "MEDIUM" | "HIGH";
}

interface PostGoalProps {
  body: CreateGoalDto;
  sessionId: string;
}

export async function postGoal({ sessionId, body }: PostGoalProps) {
  try {
    const response = await fetch(`${api.baseURL}/api/goals`, {
      method: "POST",
      cache: "no-cache",
      headers: {
        Authorization: `Bearer ${sessionId}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (response.status === 401) throw new UnauthorizatedError();

    const data = await response.json();
    return { data };
  } catch (error) {
    return { error };
  }
}
