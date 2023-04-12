import clsx from "clsx";

export function renderTask(task: any) {
  const handleDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    id: string
  ) => {
    event.dataTransfer.setData("taskId", id);
  };

  return (
    <div
      key={task.id}
      className="w-[90%] rounded-xl bg-white px-4 py-3"
      draggable
      onDragStart={(e) => handleDragStart(e, task.id)}
    >
      <div className="task-status">
        <div
          className={clsx(
            "inline-block whitespace-nowrap rounded-md bg-[#F9EEE3] p-1 text-xs font-medium text-[#D58D49]"
          )}
        >
          <p>{task.label}</p>
        </div>
      </div>
      <h1 className="pt-2 font-medium">{task.name}</h1>
      <span className="text-sm leading-3">{task.description}</span>
    </div>
  );
}
