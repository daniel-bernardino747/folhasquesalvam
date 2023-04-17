import { api } from "@/config/api";
import { UnauthorizatedError } from "@/errors";

interface GetDataProps {
  sessionId: string | undefined | null;
  userId: string | undefined | null;
}

interface PatchGoalDto {
  status: "DO" | "DONE" | "PROGRESS" | "REVIEW";
}

interface PatchGoalStatusProps {
  body: PatchGoalDto;
  sessionId: string;
  goalId: number;
}

export async function getData({ userId, sessionId }: GetDataProps) {
  try {
    const response = await fetch(`${api.baseURL}/api/goals/${userId}/member`, {
      method: "GET",
      cache: "no-cache",
      headers: { Authorization: `Bearer ${sessionId}` },
    });
    if (response.status === 401) throw new UnauthorizatedError();

    const data = await response.json();
    return { data };
  } catch (error) {
    return { error };
  }
}

export async function patchGoalStatus({
  sessionId,
  body,
  goalId,
}: PatchGoalStatusProps) {
  try {
    const response = await fetch(`${api.baseURL}/api/goals/${goalId}`, {
      method: "PATCH",
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
