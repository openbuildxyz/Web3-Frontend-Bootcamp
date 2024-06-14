import React, { useEffect } from 'react'
import AddToDo from '../addtodo/page'
import ToDoItem from '../todoitem/page'
import { useState } from 'react'
import { TODO } from '@/app/utils/interface/page'

export default function ToDoList() {
  const [todoList, settodoList] = useState<TODO[]>([])

  function setlocalList(list: TODO[]) {
    localStorage.setItem('todolist', JSON.stringify(list))
  }

  function getlocalList() {
    const list = localStorage.getItem('todolist')
    if (list) {
      return JSON.parse(list)
    }
  }
  useEffect(() => {
    const list = getlocalList()
    if (list) {
      settodoList(list)
    }
  }, [])

  const AddTodo = (todo: TODO) => {
    const newlist = todoList.concat(todo)
    settodoList(newlist)
    setlocalList(newlist)
  }

  const Finished = (index: number) => {
    const newlist = todoList.map((todo: TODO, i: number) => {
      if (i === index) {
        todo.completed = !todo.completed
        console.log(todo.title + ' is' + todo.completed)
      }
      return todo
    })
    settodoList(newlist)
    setlocalList(newlist)
  }

  const DeleteTodo = (index: number) => {
    const newlist = todoList.filter((todo: TODO, i: number) => i !== index)
    settodoList(newlist)
    setlocalList(newlist)
  }

  return (
    <>
      <AddToDo add={AddTodo} />
      <div className="bg-slate-600  w-full flex flex-col justify-center items-center">
        {todoList.map((todo, index) => {
          return (
            <ToDoItem
              key={index}
              todo={todo}
              finish={Finished}
              del={DeleteTodo}
              index={index}
            />
          )
        })}
      </div>
    </>
  )
}
