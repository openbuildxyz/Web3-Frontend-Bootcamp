export type TodoItemData = {
  id: string;
  content: string;
  isDone: boolean;
};

type ToDoItemProps = {
  data: TodoItemData;
  onRemove: (id: string) => void;
  onUpdateIsDone: (id: string) => void;
};

export default function ToDoItem(props: ToDoItemProps) {
  const { data, onRemove, onUpdateIsDone } = props;
  return (
    <li className="flex flex-row gap-x-3 p-2 border border-black border-solid">
      <input
        type="checkbox"
        checked={data.isDone}
        className="checkbox checkbox-md"
        onChange={() => {
          onUpdateIsDone(data.id);
        }}
      />
      <div
        className={`grow max-w-56 break-words ${
          data.isDone ? "line-through" : ""
        }`}
      >
        {data.content}
      </div>
      <button
        className="btn btn-sm btn-error btn-circle btn-outline"
        onClick={() => onRemove(data.id)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </li>
  );
}
