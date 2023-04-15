function validateForm(peopleSelected: any[], startDate: Date | null) {
  const errorSelected = {
    date: { value: false, message: "" },
    members: { value: false, message: "" },
  };

  if (!startDate) {
    errorSelected.date = {
      value: true,
      message: "Selecione a data de entrega.",
    };
  } else {
    const currentDate = new Date();
    const minDate = new Date();
    minDate.setDate(currentDate.getDate() + 3);
    const selectedDate = new Date(startDate);
    if (selectedDate < minDate) {
      errorSelected.date = {
        value: true,
        message:
          "A data de entrega precisa ser no mínimo 3 dias após a data atual.",
      };
    }
  }

  if (peopleSelected.length === 0) {
    errorSelected.members = {
      value: true,
      message: "Selecione alguém para a tarefa.",
    };
  }

  return errorSelected;
}
