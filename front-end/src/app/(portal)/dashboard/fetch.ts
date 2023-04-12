import { cookies } from "next/dist/client/components/headers";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

export async function getAllMembers(sessionId: string | undefined | null) {
  console.log("my session =>", { sessionId });
  try {
    const response = await fetch("http://localhost:4000/api/members", {
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
