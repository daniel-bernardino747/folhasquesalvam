interface ErrorFormProps {
  condicional: boolean;
  message?: string;
}

export function ErrorForm({
  condicional,
  message = "Campo obrigatório.",
}: ErrorFormProps) {
  if (condicional) {
    return (
      <span className="text-xs font-medium leading-3 text-red-600	">
        {message}
      </span>
    );
  }
  return <></>;
}
