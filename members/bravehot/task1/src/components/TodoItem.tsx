import { Todo } from "@/@types";

type Props = {
  data: Todo;
  deleteTodo: (id: number) => void;
};
const TodoItem: React.FC<Props> = ({ data, deleteTodo }) => {
  return (
    <div
      className="text-xl font-medium flex gap-2 p-4 border-b border-gray-700/20 hover:bg-gray-700/5 transition-colors"
      key={data.id}
    >
      <div className="flex-1 overflow-hidden text-ellipsis text-nowrap">
        {data.title}
      </div>

      <button
        className="btn btn-sm btn-error flex-shrink-0"
        onClick={() => {
          deleteTodo(data.id);
        }}
      >
        Delete
      </button>
    </div>
  );
};

export default TodoItem;
