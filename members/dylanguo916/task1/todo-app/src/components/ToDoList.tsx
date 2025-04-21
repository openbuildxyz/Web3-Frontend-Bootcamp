// src/components/ToDoList.tsx
import ToDoItem from './ToDoItem';

interface ToDo {
  id: number;
  text: string;
  completed: boolean;
}

interface ToDoListProps {
  todos: ToDo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const ToDoList = ({ todos, onToggle, onDelete }: ToDoListProps) => {
  return (
    <ul>
      {todos.map((todo) => (
        <ToDoItem
          key={todo.id}
          {...todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
};

export default ToDoList;