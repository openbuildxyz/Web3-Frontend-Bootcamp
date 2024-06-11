import ToDoItem from "./ToDoItem.tsx";

export default function ToDoList({
  todos,
  onDeleteTodo,
}: {
  todos: string[];
  onDeleteTodo: (index: number) => void;
}) {
  return (
    <div>
      <ul>
        {todos.map((todo, index) => (
          <li key={todo}>
            <ToDoItem todo={todo} index={index} onDelete={onDeleteTodo} />
          </li>
        ))}
      </ul>
    </div>
  );
}
