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
    <div className="todo-item">
      <p>{todo}</p>
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
