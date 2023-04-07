import { UnauthorizatedError } from "@/errors";

export async function getData(sessionId: string | undefined | null) {
  try {
    const response = await fetch("http://localhost:4000/api/goals", {
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
