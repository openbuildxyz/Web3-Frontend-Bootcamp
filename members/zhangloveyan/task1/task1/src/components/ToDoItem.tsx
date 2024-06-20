interface Todo {
    id: number;
    text: string;
    isCompleted: boolean;
}

interface TodoItemProps {
    todo: Todo;
    isCompleted: boolean;
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
}

function TodoItem({ todo, isCompleted, onToggle, onDelete }: TodoItemProps) {
    return (
        <li style={{ textDecoration: isCompleted ? 'line-through' : 'none' }}>
            <input type="checkbox" checked={isCompleted} onChange={()=>onToggle(todo.id)} />
            {todo.text}
            <button onClick={() => onDelete(todo.id)}>删除</button>
        </li>
    );
}

export default TodoItem;
