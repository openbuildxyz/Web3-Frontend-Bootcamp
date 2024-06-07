import React, { useState } from 'react';
import { ToDo } from './entity/ToDo';
import {Checkbox, CheckboxProps} from 'antd';
import './ToDoItem.scss'

interface ToDoItemProps {
    item: ToDo;
    deleteToDo: (id: number) => void;
}

export const ToDoItem: React.FC<ToDoItemProps> = ({ item, deleteToDo }) => {
    const [checked, setChecked] = useState(false);
    const onChange: CheckboxProps['onChange'] = (e) => {
        setChecked(e.target.checked);
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