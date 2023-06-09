import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import "react-datepicker/dist/react-datepicker.css";

import clsx from "clsx";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Select, setOptions, localePtBR } from "@mobiscroll/react";
import { ErrorForm } from "./ErrorForm";
import { FormButtons } from "./FormButtons";
import DatePicker from "react-datepicker";
import { FormCreateCardProps, FormData } from "@/types";
import { postGoal } from "./fetch";
import Swal from "sweetalert2";
import { useAuth } from "@clerk/nextjs";
import { validateForm } from "./validateForm";

setOptions({
  locale: localePtBR,
  theme: "material",
  themeVariant: "light",
});

export function FormCreateCard({
  useToggle,
  color,
  members,
  setData,
}: FormCreateCardProps) {
  const { sessionId } = useAuth();
  const [isVisible, toggle] = useToggle;
  const { register, handleSubmit, formState, reset } = useForm<FormData>();

  const [memberOptions] = useState(
    members.map((member: any) => ({
      value: member.id,
      text: member.name,
    }))
  );

  const [formErrors, setErrorSelected] = useState({
    date: { value: false, message: "" },
    members: { value: false, message: "" },
  });

  const [selectedPeople, setPeopleSelected] = useState([]);
  const [startDate, setStartDate] = useState<Date | null>(null);

  const onSubmit = async (data: FormData) => {
    const formErrors = validateForm(selectedPeople, startDate);
    setErrorSelected(formErrors);

    if (!formErrors.date.value && !formErrors.members.value) {
      try {
        const requestBody = {
          title: data.title,
          description: data.description,
          membersIds: selectedPeople.map((personId) => ({
            memberId: personId,
          })),
          deliveryDate: startDate as Date,
        };

        const response = await postGoal({
          sessionId: sessionId as string,
          body: requestBody,
        });

        if (response.error) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: '<a href="">Why do I have this issue?</a>',
          });
        } else {
          Swal.fire({
            icon: "success",
            title: "Eba!",
            text: "Formulário enviado com sucesso!",
          });
          setData((prevGoals: any) => {
            const newGoal = response.data;
            const cloneToUpdate = JSON.parse(JSON.stringify(prevGoals));

            const prevList = prevGoals[newGoal.status].list;
            newGoal.label = "Low";

            cloneToUpdate[newGoal.status].list = [...prevList, newGoal];
            return cloneToUpdate;
          });
          handleFormReset();
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleFormReset = () => {
    setPeopleSelected([]);
    setErrorSelected({
      members: { message: "", value: false },
      date: { message: "", value: false },
    });
    setStartDate(null);
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
      <ErrorForm condicional={!!formState.errors.title} />

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
      <ErrorForm condicional={!!formState.errors.description} />

      <DatePicker
        className={clsx(
          "w-full rounded-md bg-gray-100 px-2 py-1 outline-none transition-all duration-100  focus:bg-gray-200",
          {
            "border-2 border-red-400": formErrors.date.value,
          }
        )}
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        placeholderText="Selecione a data de entrega"
      />
      <ErrorForm
        condicional={!!formErrors.date.value}
        message={formErrors.date.message}
      />

      <Select
        data={memberOptions}
        value={selectedPeople}
        selectMultiple={true}
        onChange={(e: any) => setPeopleSelected(e.value)}
        label="Pessoas envolvidas"
        inputProps={{
          inputStyle: "outline",
          labelStyle: "stacked",
          placeholder: "Selecione alguém...",
        }}
      />
      <div className="pb-4">
        <ErrorForm
          condicional={!!formErrors.members.value}
          message={formErrors.members.message}
        />
      </div>

      <FormButtons color={color} handleFormReset={handleFormReset} />
    </form>
  );
}
