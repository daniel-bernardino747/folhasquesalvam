"use client";
import {
  getUserAlerts,
  APIAlerts,
  patchAlert,
  AlertDto,
} from "@/app/(portal)/messages/fetch";
import { useUserContext } from "@/contexts";
import { Alert } from "@/types";
import { useAuth } from "@clerk/nextjs";
import { use, useState } from "react";
import ErrorPage from "../ErrorPage";
import Swal from "sweetalert2";
import clsx from "clsx";

type AlertProps = {
  alert: Alert;
  sessionId: string | undefined | null;
};

const AlertRow = ({ alert, sessionId }: AlertProps) => {
  const stateResolved = alert.isResolved as boolean;
  const [resolved, setResolved] = useState(stateResolved);

  const handleResolvedChange = async () => {
    const requestBody = {
      isResolved: !resolved,
    };

    const response = await patchAlert({
      sessionId,
      body: requestBody as AlertDto,
      alertId: alert.id,
    });

    try {
      if (response.error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Não conseguimos mudar o estado.",
        });
      }
    } catch (error) {
      console.error(error);
    }
    setResolved(!resolved);
  };

  return (
    <tr
      key={alert.id}
      className={clsx(
        "border-t border-transparent border-gray-300 hover:cursor-pointer hover:bg-gray-100",
        { "bg-gray-100 text-gray-500": resolved }
      )}
    >
      <td className="relative py-3 px-2">
        {!resolved && (
          <div className="absolute top-2 left-0 h-2 w-2 animate-ping rounded-full bg-red-500" />
        )}

        {alert.alertType}
      </td>
      <td>{alert.description}</td>
      <td>
        <input
          type="checkbox"
          checked={resolved}
          onChange={handleResolvedChange}
          className="h-5 w-5 default:ring-2 checked:bg-blue-500"
        />
      </td>
    </tr>
  );
};

export function AlertList() {
  const { sessionId } = useAuth();
  const { user } = useUserContext();
  const { data, error }: APIAlerts = use(
    getUserAlerts(sessionId, user.member?.id)
  );

  const [alerts] = useState<Alert[] | undefined>(data);

  if (error) {
    return <ErrorPage>Tivemos um erro</ErrorPage>;
  }

  if (!alerts) {
    return <>Não tem mensagens ou avisos</>;
  }

  return (
    <table className="w-full table-auto border-collapse pt-6">
      <thead>
        <tr>
          <th className="px-2 pb-4 pt-6 text-left font-normal text-gray-500">
            Título
          </th>
          <th className="pb-4 pt-6 text-left font-normal text-gray-500">
            Descrição
          </th>
          <th className="pb-4 pt-6 text-left font-normal text-gray-500">
            Visto
          </th>
        </tr>
      </thead>
      <tbody>
        {alerts.map((alert: Alert) => (
          <AlertRow key={alert.id} alert={alert} sessionId={sessionId} />
        ))}
      </tbody>
    </table>
  );
}
