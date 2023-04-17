import { api } from "@/config/api";
import { Member } from "@/types";

export interface GetMemberAPI {
  data?: Member;
  error?: unknown;
}

export async function getMember(
  sessionId: string | undefined | null,
  memberId: string
) {
  try {
    const response = await fetch(`${api.baseURL}/api/members/${memberId}`, {
      method: "GET",
      cache: "no-cache",
      headers: { Authorization: `Bearer ${sessionId}` },
    });

    const data = await response.json();
    return { data };
  } catch (error) {
    return { error };
  }
}
