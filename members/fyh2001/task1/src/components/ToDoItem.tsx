import React from "react";
import { IToDoItem } from "../types";

interface IToDoItemProps {
  data: IToDoItem;
  onDelete: (id: string) => void;
  onUpdateDoneStatus: (id: string, isDone: boolean) => void;
}

const ToDoItem: React.FC<IToDoItemProps> = (props) => {
  const { data, onDelete, onUpdateDoneStatus } = props;
  const checkBoxId = `${data.id}-checkbox`;

  return (
    <div className="flex items-center gap-4">
      <input
        id={checkBoxId}
        type="checkbox"
        checked={data.isDone}
        title={data.isDone ? "Set to Not Completed" : "Set as Completed"}
        onChange={() => onUpdateDoneStatus(data.id, !data.isDone)}
      />
      <label htmlFor={checkBoxId} className="line-clamp-1 cursor-pointer">
        {data.content}
      </label>
      <button
        className="py-1 px-2 rounded-md bg-[#d7eadc] text-[#4b9e5f]"
        onClick={() => onDelete(data.id)}
      >
        Delete
      </button>
    </div>
  );
};

export default ToDoItem;
