import { FC } from 'react';
import TodoItem from './item'
import type { TodoItemInfo } from './item'

interface ToDoListProps {
    todos: TodoItemInfo[]
    onToggle: (id: number) => void
    onDelete: (id: number) => void
}
const ToDoList: FC<ToDoListProps> = ({ todos, onToggle, onDelete }) => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            {
                todos.map(
                    (item, idx) =>
                        <TodoItem
                            key={`todo-${idx}`}
                            todo={item}
                            id={idx}
                            onToggle={onToggle}
                            onDelete={onDelete}
                        />
                )
            }
        </div>
    )
}

export default ToDoList