import React from 'react';
import TodoItem, { IToDoItem } from '../toDoItem';


interface IProps {
    list: IToDoItem[];
    onRemove: (id: string) => void;
    onDone: (id: string, flag: boolean) => void;
}

const ToDoList: React.FC<IProps> = (props) => {
    const {list, onRemove, onDone} = props;
    return (
        <ul>
            {list.map(item => {
                return <TodoItem 
                    key={item.id} 
                    {...item}
                    onDone={(flag: boolean) => {
                        onDone(item.id, flag);
                    }} 
                    onRemove={() => {
                        onRemove(item.id);
                    }}
                />
            })}
        </ul>
    )
}

export default ToDoList;