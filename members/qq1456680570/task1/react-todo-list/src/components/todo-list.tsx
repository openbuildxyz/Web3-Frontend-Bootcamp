import React, { useEffect } from 'react'
import TodoListItem, { TodoItem } from './todo-list-item'
import globalDataContext, { useGlobal } from '../context';

type Props = {
    setTodoList: Function;
}

export default function TodoList({ }: Props) {

    const { todoList, handleRemove } = useGlobal()
 

    return (
        <div className='todo-list'>
            {
                todoList.map((item, index) => {
                    return <TodoListItem
                        key={item.id}
                        id={item.id}
                        index={index+1}
                        content={item.content}
                        callback={id => handleRemove(id)}
                    />
                })
            }
        </div>
    )
}