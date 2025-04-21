// src/components/ToDoItem.tsx
interface ToDoItemProps {
    id: number;
    text: string;
    completed: boolean;
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
  }
  
  const ToDoItem = ({ id, text, completed, onToggle, onDelete }: ToDoItemProps) => {
    return (
      <li
        style={{
          textDecoration: completed ? 'line-through' : 'none',
          cursor: 'pointer',
        }}
        onClick={() => onToggle(id)}
      >
        {text}
        <button onClick={(e) => {
          e.stopPropagation();
          onDelete(id);
        }}>
          Delete
        </button>
      </li>
    );
  };
  
  export default ToDoItem;