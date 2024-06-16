import { FC } from 'react';

export enum ItemStatus {
    Created = 'Created',
    Finished = 'Finished',
}

export interface TodoItemInfo {
    title: string;
    status: ItemStatus
}

export interface TodoItemProps {
    id: number
    todo: TodoItemInfo
    onToggle: (id: number) => void
    onDelete: (id: number) => void
}

const TodoItem: FC<TodoItemProps> = ({ id, todo, onToggle, onDelete }) => {
    const { title, status } = todo;
    return <div
        style={{
            display: 'flex',
            flexDirection: 'row'
        }}>
        <input
            type="checkbox"
            checked={status === ItemStatus.Finished}
            onChange={() => {
                onToggle(id)
            }}
        />
        <span
            style={{
                textDecoration: status === ItemStatus.Finished ? 'line-through' : undefined
            }}
        >
            {title}
        </span>
        <span
            style={{
                marginLeft: 'auto',
                cursor: 'pointer'
            }}
            onClick={() => {
                onDelete(id)
            }}>
            x
        </span>
    </div>
}

export default TodoItem;