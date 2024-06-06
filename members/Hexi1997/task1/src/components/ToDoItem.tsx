import { ITodoItem } from "./ToDoList";

interface IToDoItemProps {
  data: ITodoItem;
  onDelete: (id: string) => void;
  onUpdateDoneStatus: (id: string, isDone: boolean) => void;
}
export function ToDoItem(props: IToDoItemProps) {
  const { data, onDelete, onUpdateDoneStatus } = props;
  const checkBoxId = `${data.id}-checkbox`;
  return (
    <li
      key={data.id}
      className="w-full flex items-center h-12 text-lg gap-x-4 mt-2"
    >
      <div className="w-2/3 h-full flex items-center justify-start gap-x-1">
        <input
          type="checkbox"
          id={checkBoxId}
          checked={data.isDone}
          className="scale-125 cursor-pointer"
          title={data.isDone ? "Set to Not Completed" : "Set as Completed"}
          onChange={() => {
            onUpdateDoneStatus(data.id, !data.isDone);
          }}
        />
        <label htmlFor={checkBoxId} className="line-clamp-1 cursor-pointer">
          {data.content}
        </label>
      </div>
      <button
        onClick={() => {
          onDelete(data.id);
        }}
        className="w-1/3 bg-[#272b33] text-white rounded-lg h-full duration-200 hover:opacity-95"
      >
        Delete
      </button>
    </li>
  );
}
