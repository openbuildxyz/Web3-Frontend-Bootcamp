import { FC } from 'react';
import { Todo } from './TodoList';
interface TodoItemProps {
  todo: Todo;
  deleteTodo: (id: number) => void;
  toggleComplete: (id: number) => void;
}
const TodoItem: FC<TodoItemProps> = (props) => {
  const { todo, deleteTodo, toggleComplete } = props;
  return (
    <li
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '10px',
        padding: '20px',
        background: '#a25b33',
        borderRadius: '20px'
      }}
    >
      <span
        style={{ textDecoration: todo.completed ? 'line-through' : 'none', cursor: 'pointer' }}
        onClick={() => toggleComplete(todo.id)}
      >
        {todo.text}
      </span>
      <button onClick={() => deleteTodo(todo.id)}>Delete</button>
    </li>
  );
};

export default TodoItem;
