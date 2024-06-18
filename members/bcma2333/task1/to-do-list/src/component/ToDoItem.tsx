import React, { useState } from 'react';
import { ToDo } from './entity/ToDo';
import {Checkbox, CheckboxProps} from 'antd';
import './ToDoItem.scss'

interface ToDoItemProps {
    item: ToDo;
    deleteToDo: (id: number) => void;
}

export const ToDoItem: React.FC<ToDoItemProps> = ({ item, deleteToDo }) => {
    const [checked, setChecked] = useState(item.isCompleted);
    const onChange: CheckboxProps['onChange'] = (e) => {
        setChecked(e.target.checked);
        const initialItems = localStorage.getItem('todos')
        const todos :ToDo[] = initialItems ? JSON.parse(initialItems) : [];
        todos.map((todo : ToDo) => {
            if (todo.id == item.id) {
                todo.isCompleted = !checked;
                console.log(todo);
            }
        }) 
        console.log(todos);
        localStorage.setItem('todos', JSON.stringify(todos));
      };
    const handleDelete = () => {
        deleteToDo(item.id);
      };

    return (
        <li>
                <Checkbox checked={checked} onChange={onChange}>
                    <span className={checked ? "strikethrough" : ""}>{item.text}</span>
                </Checkbox>
                <button onClick={handleDelete}> delete </button>
            </li>
            );
    }

export default ToDoItem;