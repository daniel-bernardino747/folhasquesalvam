import Swal from "sweetalert2";
import { AlertDto, postAlert } from "./fetch";

export function submitRequestGoals(sessionId: string, memberId: number) {
  Swal.fire({
    icon: "info",
    title: "Sem metas :(",
    text: "Reparei que você não tem nenhuma meta por enquanto, vamos solicitar metas para bater?",
    showCancelButton: true,
    confirmButtonText: "Quero metas!",
    cancelButtonText: "Agora não.",
  }).then(async (result) => {
    if (result.isConfirmed) {
      const requestBody = {
        role: "DIRECTOR",
        alertType: "Solicitação de Meta",
        description: `O membro com id: ${memberId} não possui nenhuma meta no momento e solicitou um pedido para atribuição de novas metas`,
      };

      const response = await postAlert({
        sessionId,
        body: requestBody as AlertDto,
      });

      try {
        if (response.error) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Não conseguimos enviar seu pedido.",
          });
        } else {
          Swal.fire("Aguarde contato dos nossos diretores.", "", "success");
        }
      } catch (error) {
        console.error(error);
      }
    }
  });
}
