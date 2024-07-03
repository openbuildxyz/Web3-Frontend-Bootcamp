import React from 'react'
import '../assets/style.scss'
import { useGlobal } from '../context';
import cls from 'classnames'

export interface TodoItem {
    // todo item
    id: string;
    content: string;
    complete: boolean;
}
interface TodoItemProps extends TodoItem {
    // 组件字段
    index?: number | string;
}

const TodoListItem: React.FC<TodoItemProps> = ({ index, content, id, complete }) => {
    const { handleRemove, handleDone, handleUndo } = useGlobal()
    return (
        <div className={cls('todo-item', { complete })} >
            <div className="num">{index}</div>
            <div className="content">{content}</div>
            <div className="remove" onClick={() => handleRemove(id)}>remove</div>
            {complete && <div className="undo" onClick={() => handleUndo(id)}>Undo</div>}
            {!complete && <div className="done" onClick={() => handleDone(id)}>Done</div>}
        </div>
    )
}
export default TodoListItem