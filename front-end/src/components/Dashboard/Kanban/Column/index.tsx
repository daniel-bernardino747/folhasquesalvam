import { renderTask } from "../Task";

interface ColumnKanbanProps {
  labelName: string;
  color: string;
  data: any;
  handleDrop: (
    event: React.DragEvent<HTMLDivElement>,
    newStatus: "DO" | "PROGRESS" | "DONE"
  ) => void;
  statusDefault: "DO" | "PROGRESS" | "DONE";
}

export function ColumnKanban(props: ColumnKanbanProps) {
  const { labelName, color, data, handleDrop, statusDefault } = props;

  const colorDefault = color || "#000";
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  return (
    <div
      onDrop={(e) => handleDrop(e, statusDefault)}
      onDragOver={handleDragOver}
      className="flex flex-col rounded-xl bg-[#F5F5F5]"
    >
      <div className="flex w-full flex-col">
        <h2 className="flex w-[90%] items-center py-2 px-4">
          <div
            className="mr-2 h-2 w-2 rounded-full"
            style={{ backgroundColor: colorDefault }}
          />
          {labelName}
          <div className="ml-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#E0E0E0] text-[10px] font-bold text-[#625F6D]">
            {data.length}
          </div>
        </h2>
        <div className="flex h-1 w-full justify-center">
          <div
            className="h-full w-[90%] rounded-full"
            style={{ backgroundColor: colorDefault }}
          ></div>
        </div>
      </div>
      <div className="flex w-full flex-col items-center gap-3 py-4">
        {data.map(renderTask)}
      </div>
    </div>
  );
}
