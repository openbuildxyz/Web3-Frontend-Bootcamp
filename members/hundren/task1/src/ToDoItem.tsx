import { Todo } from './i'

interface ToDoItemProps {
  todo: Todo;
  handleCompleteClick: (index: number) => void;
  handleDeleteClick: (index: number) => void;
  index: number;
}

const ToDoItem: React.FC<ToDoItemProps> = ({ todo, handleCompleteClick, handleDeleteClick, index }) => {
  const handleComplete = () => {
    handleCompleteClick(index);
  };

  const handleDelete = () => {
    handleDeleteClick(index);
  };

  return (
    <li>
      <input type="checkbox" checked={todo.completed} onChange={handleComplete} />
      <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.text}</span>
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
};

export default ToDoItem;