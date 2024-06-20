import { useState } from 'react'
import { ToDo } from '../types/ToDo'

interface IToDoItem {
    todo: ToDo
    toggleCheck: (id: number) => void
    onDelete: (id: number) => void
    onTextChange: (id: number, text: string) => void
}

const ToDoItem: React.FC<IToDoItem> = ({ todo, toggleCheck, onDelete, onTextChange }) => {

    // 初始化编辑状态
    const [isEditing, setIsEditing] = useState(false);
    // 初始化编辑内容
    const [newText, setNewText] = useState(todo.text);
    function handleCheck() {
        toggleCheck(todo.id);
    }

    function handleDelete() {
        onDelete(todo.id);
    }

    function handleEdit(Event: React.ChangeEvent<HTMLInputElement>) {
        setNewText(Event.target.value);
    }

    function handleSave() {
        if (isEditing === true) {
            onTextChange(todo.id, newText);
        }
        setIsEditing(!isEditing);
    }

    if (isEditing) {
        return (
            <li key={`${todo.id}`}>
                <label>
                    <input type="text"  value={newText} onChange={handleEdit} />
                    {null}
                </label>
                {/* 保存修改状态 */}
                <button onClick={handleSave} >{isEditing ? 'Save' : 'Edit'}</button>
            </li>
        )
    }


    return (
        <li key={`${todo.id}`}>
            <label>
                <input type="checkbox"  checked={todo['complete']} onChange={handleCheck} />
                <p>{newText}</p>
            </label>
            <button onClick={handleDelete} >Delete</button>
            <button onClick={() => setIsEditing(!isEditing)} >{isEditing ? 'Save' : 'Edit'}</button>
        </li>
    )
}

export default ToDoItem;