export interface Todo {
  id: number;
  text: string;
  done: boolean;
}

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <li
      className={`group relative flex justify-between pr-8 ${todo.done ? 'line-through text-gray-400' : ''}`}
      key={todo.id}
    >
      <label className='flex items-center gap-2 '>
        <input type='checkbox' checked={todo.done} onChange={() => onToggle(todo.id)} />
        <span className='break-all '>{todo.text}</span>
      </label>
      <button
        className='absolute right-1 top-1/2 -translate-y-1/2 text-gray-500 hover:opacity-80 hidden group-hover:block'
        onClick={() => onDelete(todo.id)}
      >
        x
      </button>
    </li>
  );
}

export default TodoItem;
