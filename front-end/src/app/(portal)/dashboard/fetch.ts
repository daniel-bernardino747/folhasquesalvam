import { api } from "@/config/api";

export async function getAllMembers(sessionId: string | undefined | null) {
  try {
    const response = await fetch(`${api.baseURL}/api/members`, {
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
export interface APIMembers {
  data?: string[];
  error?: unknown;
}
