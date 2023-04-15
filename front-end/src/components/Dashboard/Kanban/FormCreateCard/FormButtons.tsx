interface FormButtonsProps {
  color: string;
  handleFormReset: () => void;
}

export function FormButtons({ color, handleFormReset }: FormButtonsProps) {
  return (
    <div className="grid grid-cols-2 gap-2">
      <button
        type="submit"
        className="rounded-lg px-4 py-1"
        style={{ backgroundColor: color }}
      >
        Salvar
      </button>
      <button
        type="reset"
        onClick={handleFormReset}
        className="rounded-lg bg-gray-200 px-4 py-1"
      >
        Cancelar
      </button>
    </div>
  );
}
