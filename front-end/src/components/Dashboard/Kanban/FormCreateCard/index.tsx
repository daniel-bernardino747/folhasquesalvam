import "@mobiscroll/react/dist/css/mobiscroll.min.css";

import clsx from "clsx";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Select, setOptions, localePtBR, Datepicker } from "@mobiscroll/react";

interface FormCreateCardProps {
  useToggle: [boolean, (nextValue?: any) => void];
  color: string;
}

interface FormData {
  title: string;
  description: string;
  people: string[];
}

setOptions({
  locale: localePtBR,
  theme: "material",
  themeVariant: "light",
});

const myData = [
  {
    value: 1,
    text: "Fulano",
  },
  {
    value: 2,
    text: "Movies, Music & Games",
  },
  {
    value: 3,
    text: "Electronics & Computers",
  },
  {
    value: 4,
    text: "Home, Garden & Tools",
  },
  {
    value: 5,
    text: "Health & Beauty",
  },
  {
    value: 6,
    text: "Toys, Kids & Baby",
  },
  {
    value: 7,
    text: "Clothing & Jewelry",
  },
  {
    value: 8,
    text: "Sports & Outdoors",
  },
  {
    value: 9,
    text: "Automotive & Industrial",
  },
];

export function FormCreateCard({ useToggle, color }: FormCreateCardProps) {
  const { register, handleSubmit, formState, reset } = useForm<FormData>();
  const [errorSelected, setErrorSelected] = useState({
    date: { value: false, message: "" },
    members: { value: false, message: "" },
  });
  const [peopleSelected, setPeopleSelected] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [isVisible, toggle] = useToggle;

  const onSubmit = (data: FormData) => {
    const invalidMembers = !peopleSelected.length;
    const invalidDate = !startDate;

    let newDateError = { value: false, message: "" };
    let newMembersError = { value: false, message: "" };

    if (invalidMembers || invalidDate) {
      if (invalidMembers) {
        newMembersError = {
          message: "Selecione alguém para a tarefa.",
          value: true,
        };
      }
      if (invalidDate) {
        newDateError = { message: "Selecione a data de entrega.", value: true };
      }
      setErrorSelected({
        date: newDateError,
        members: newMembersError,
      });
      return;
    }

    const currentDate = new Date();
    const minDate = new Date();
    minDate.setDate(currentDate.getDate() + 3);
    const selectedDate = new Date(startDate);
    console.log({ minDate, selectedDate });
    console.log(selectedDate < minDate);
    if (selectedDate < minDate) {
      setErrorSelected((prev) => ({
        ...prev,
        date: {
          message:
            "A data de entrega precisa ser no mínimo 3 dias após a data atual.",
          value: true,
        },
      }));
      return;
    }

    setPeopleSelected([]);
    setErrorSelected({
      members: { message: "", value: false },
      date: { message: "", value: false },
    });
    setStartDate("");
    reset();
  };
  const onChangeSelected = (e: any) => setPeopleSelected(e.value);

  const cancelCreate = () => {
    setPeopleSelected([]);
    setErrorSelected({
      members: { message: "", value: false },
      date: { message: "", value: false },
    });
    setStartDate("");
    toggle(!isVisible);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={clsx("w-[90%] rounded-xl bg-white px-4 py-3 transition", {
        animate__bounceIn: isVisible,
        hidden: !isVisible,
      })}
      style={{ animationDuration: "0.5s" }}
    >
      <input
        type="text"
        className={clsx(
          "w-full rounded-md bg-gray-100 px-2 py-1 outline-none transition-all duration-100  focus:bg-gray-200",
          {
            "border-2 border-red-400": formState.errors.title,
          }
        )}
        {...register("title", { required: true })}
        placeholder="Digite o título da tarefa"
      />
      {formState.errors.title && (
        <span className="text-xs font-medium text-red-600">
          Campo obrigatório
        </span>
      )}

      <textarea
        className={clsx(
          "mt-1 w-full rounded-md bg-gray-100 px-2 py-1 outline-none transition-all duration-100  focus:bg-gray-200",
          {
            "border-2 border-red-400": formState.errors.description,
          }
        )}
        {...register("description", { required: true })}
        placeholder="Digite a descrição da tarefa"
      />
      {formState.errors.description && (
        <span className="text-xs font-medium text-red-600">
          Campo obrigatório.
        </span>
      )}

      <Datepicker
        value={startDate}
        label="Data de entrega"
        dateFormat="DD/MM/YYYY"
        onChange={(e) => setStartDate(e.value)}
      />

      <div className="relative">
        <Select
          data={myData}
          value={peopleSelected}
          selectMultiple={true}
          onChange={onChangeSelected}
          label="Pessoas envolvidas"
          inputProps={{
            inputStyle: "outline",
            labelStyle: "stacked",
            placeholder: "Selecione alguém...",
          }}
        />
      </div>
      <div className="flex flex-col pb-4">
        {errorSelected.date.value && (
          <span className="px-2 text-xs font-medium text-red-600">
            {errorSelected.date.message}
          </span>
        )}
        {errorSelected.members.value && (
          <span className="px-2 text-xs font-medium text-red-600">
            {errorSelected.members.message}
          </span>
        )}
      </div>

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
          onClick={cancelCreate}
          className="rounded-lg bg-gray-200 px-4 py-1"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
