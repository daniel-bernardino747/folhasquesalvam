import { ButtonCreateCard, FormCreateCard } from "@/components";
import "animate.css";
import { useToggle } from "react-use";

export function useCreateCard(color: string) {
  const useHook = useToggle(false);
  const [isOn] = useHook;

  return {
    createCardComponent: <ButtonCreateCard color={color} useToggle={useHook} />,
    cardInputComponent: <FormCreateCard useToggle={useHook} color={color} />,
  };
}
