import ToDoItem from './ToDoItem';

interface Todo {
  id: number;
}

interface ToDoListProps {
  todos: Todo[];
  toggleComplete: (id: number) => void;
  removeToDo: (id: number) => void;
}

function ToDoList({ todos, toggleComplete, removeToDo }: ToDoListProps) {
  return (
    <ul>
      {todos.map(todo => (
        <ToDoItem
          key={todo.id}
          todo={todo}
          toggleComplete={toggleComplete}
          removeToDo={removeToDo}
        />
      ))}
    </ul>
  );
}

export default ToDoList;
