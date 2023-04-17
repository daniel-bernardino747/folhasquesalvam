import { api } from "@/config/api";
import { UnauthorizatedError } from "@/errors";
import { Alert } from "@/types";

export interface APIAlerts {
  data?: Alert[];
  error?: unknown;
}
export type AlertDto = {
  isResolved: boolean;
};

export async function getUserAlerts(
  sessionId: string | undefined | null,
  memberId: number | undefined | null
) {
  try {
    const response = await fetch(
      `${api.baseURL}/api/alerts/${memberId}/member`,
      {
        method: "GET",
        cache: "no-cache",
        headers: { Authorization: `Bearer ${sessionId}` },
      }
    );

    const data = await response.json();
    return { data };
  } catch (error) {
    return { error };
  }
}
export async function getUserAlertsPending(
  sessionId: string | undefined | null,
  memberId: number
) {
  try {
    const response = await fetch(
      `${api.baseURL}/api/alerts/${memberId}/pending`,
      {
        method: "GET",
        cache: "no-cache",
        headers: { Authorization: `Bearer ${sessionId}` },
      }
    );

    const data = await response.json();
    return { data };
  } catch (error) {
    return { error };
  }
}
export async function patchAlert({
  sessionId,
  alertId,
  body,
}: {
  sessionId: string | undefined | null;
  alertId: number;
  body: AlertDto;
}) {
  try {
    const response = await fetch(`${api.baseURL}/api/alerts/${alertId}`, {
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
