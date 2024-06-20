import { Todo } from './i'
import ToDoItem from './ToDoItem'

interface ToDoListProps {
  todos: Todo[];
  handleCompleteClick: (index: number) => void;
  handleDeleteClick: (index: number) => void;
}

const ToDoList: React.FC<ToDoListProps> = ({ todos, handleCompleteClick, handleDeleteClick }) => {
  return (
    <ul>
      {todos.map((todo, index) => (
        <ToDoItem key={index} todo={todo} handleCompleteClick={handleCompleteClick} handleDeleteClick={handleDeleteClick} index={index} />
      ))}
    </ul>
  );
};

export default ToDoList;