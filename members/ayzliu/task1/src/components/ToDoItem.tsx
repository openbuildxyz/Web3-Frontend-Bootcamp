interface ToDoItemProps {
  todo: { id: number; text: string; completed: boolean };
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
}

const ToDoItem = ({todo, toggleTodo, deleteTodo}: ToDoItemProps) => {
  return (
    <li className="flex justify-between items-center bg-gray-100 p-2 rounded mb-2">
      <span 
        className={`flex-1 cursor-pointer ${todo.completed ? 'line-through text-gray-500' : ''}`}
        onClick={()=> toggleTodo(todo.id)}
      >
        {todo.text}
      </span>
      
      <button
        className="bg-red-500 text-white px-2 py-1 rounded ml-2"
        onClick={(e) => {
        e.stopPropagation();
        deleteTodo(todo.id);
      }}>
        Delete
      </button>
    
    </li>
  );
}
export default ToDoItem;