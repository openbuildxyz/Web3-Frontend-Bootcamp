import React, { useEffect } from 'react'
import TodoListItem, { TodoItem } from './todo-list-item'
import globalDataContext, { useGlobal } from '../context';

type Props = {
    setTodoList: Function;
}

export default function TodoList({ }: Props) {

    const { todoList } = useGlobal()
    
    const doingList = todoList.filter((a) => !a.complete).sort((a,b) => a.id < b.id ? 1 : -1)
    const doneList = todoList.filter((a) => a.complete).sort((a,b) => a.id < b.id ? 1 : -1)

    return (
        <div className='todo-list'>
            {
                doingList.map((item, index) => {
                    return <TodoListItem
                        key={item.id}
                        id={item.id}
                        index={index+1}
                        complete={item.complete}
                        content={item.content}
                    />
                })
            }
            {
                doneList.map((item, index) => {
                    return <TodoListItem
                        key={item.id}
                        id={item.id}
                        index={doingList.length+index+1}
                        complete={item.complete}
                        content={item.content}
                    />
                })
            }
        </div>
    )
}