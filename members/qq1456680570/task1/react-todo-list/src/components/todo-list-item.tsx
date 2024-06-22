import React from 'react'
import '../assets/style.scss'
import { useGlobal } from '../context';

export interface TodoItem {
    // todo item
    id: string;
    content: string;

}
interface TodoItemProps extends TodoItem{
    // 组件字段
    index?: number | string;
    callback?: (id: string) => void;
}

const TodoListItem: React.FC<TodoItemProps> = ({index, content, id}) => {
    const { handleRemove } = useGlobal()
    return (
        <div className='todo-item'>
            <div className="num">{index}</div>
        <div className="content">{content}</div>
        <div className="remove" onClick={() => {
            handleRemove(id)
        }}>remove</div>
    </div>
  )
}
export default TodoListItem