import { ToDoItemType } from './App';
import ToDoItem from './ToDoItem.tsx';

interface ToDoListProps {
    todos: ToDoItemType[];
    deleteTodo: (id: number) => void;
    toggleTodo: (id: number) => void;
  }
const ToDoList: React.FC<ToDoListProps> = ({ todos, deleteTodo, toggleTodo }) => {
    return (
    <div>
      {todos.map((todo) => (
        <ToDoItem
          key={todo.id}
          todo={todo}
          deleteTodo={deleteTodo}
          toggleTodo={toggleTodo}
        />
      ))}
    </div>
  );
};

export default ToDoList;
