import ToDoItem from "./ToDoItem";

interface ToDoListProps {
  todos: {id:number; text: string; completed: boolean}[];
  toggleTodo: (id:number) => void;
  deleteTodo: (id: number) => void;
}

const ToDoList = ({todos, toggleTodo, deleteTodo}: ToDoListProps) => {
  return (
    <ul className="space-y-2">
      {todos.map(todo => (
        <ToDoItem 
          key={todo.id}
          todo={todo}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
        />
      ))}
    </ul>

  );
}
export default ToDoList;