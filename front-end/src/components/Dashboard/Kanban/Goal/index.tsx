import clsx from "clsx";
import { Goal } from "@/types";

export function renderGoal(goal: Goal) {
  const handleDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    id: string
  ) => {
    event.dataTransfer.setData("goalId", id);
  };

  const date = new Date(goal.deliveryDate).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });

  return (
    <div
      key={goal.id}
      className="w-[90%] rounded-xl bg-white px-4 py-3"
      draggable
      onDragStart={(e) => handleDragStart(e, goal.id.toString())}
    >
      <div className="goal-status flex justify-between">
        <div
          className={clsx(
            "inline-block whitespace-nowrap rounded-md bg-[#F9EEE3] p-1 text-xs font-medium text-[#D58D49]"
          )}
        >
          <p>{goal.label}</p>
        </div>
        <div
          className={clsx(
            "inline-block whitespace-nowrap rounded-md p-1 text-xs font-medium text-[#D58D49]"
          )}
        >
          <p>{date}</p>
        </div>
      </div>
      <h1 className="pt-2 font-medium">{goal.title}</h1>
      <span className="text-sm leading-3">{goal.description}</span>
    </div>
  );
}
