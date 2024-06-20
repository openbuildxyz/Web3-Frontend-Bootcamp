export default function ToDoItem({
  todo,
  index,
  onDelete,
}: {
  todo: string;
  index: number;
  onDelete: (index: number) => void;
}) {
  return (
    <div className="flex items-center border-2 border-gray-200 mb-1">
      <p className="flex-1">{todo}</p>
      <button
        onClick={() => {
          onDelete(index);
        }}
      >
        Delete
      </button>
    </div>
  );
}
