import { api } from "@/config/api";
import { Member } from "@/types";

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

export interface APIUserMember {
  data?: Member;
  error?: unknown;
}

export async function getUserMember(sessionId: string | undefined | null) {
  try {
    const response = await fetch(`${api.baseURL}/api/members/me`, {
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
