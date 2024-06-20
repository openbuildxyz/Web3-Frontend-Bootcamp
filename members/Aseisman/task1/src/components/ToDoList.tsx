import ToDoItem from './ToDoItem';
import React from 'react';
import {Item} from "../type.ts";

const ToDoList: React.FC<{ items: Item[], setItems: (values: Item[]) => void }> = (props) => {
    const handleDelete = (item: Item) => {
        const index = props.items.findIndex(i => i.id == item.id);
        if (~index) {
            props.setItems([...props.items.slice(0, index), ...props.items.slice(index + 1)]);
        }
    }
    const handleChangeStatus = (item: Item) => {
        const index = props.items.findIndex(i => i.id == item.id);
        item.status = !item.status;
        if (~index) {
            props.setItems([...props.items.slice(0, index), item, ...props.items.slice(index + 1)]);
        }
    }
    return (props?.items || []).map((item) => <ToDoItem key={item.id} item={item} del={handleDelete} changeStatus={handleChangeStatus} />)
}
export default ToDoList;