import { useEffect, useState } from "react"
import AddToDo from "../AddToDo"
import ToDoItem from "../ToDoItem"
import { TODO_LIST_STORAGE_KEY } from "@/constants"

export default function ToDoList() {
  const [todoList, setTodoList] = useState<ITodoItem[]>(() => {
    let result = []
    try {
      const todoList = JSON.parse(localStorage.getItem(TODO_LIST_STORAGE_KEY) || "[]")
      result = todoList
    } catch (error) {
      console.log('🦊  🦊', error);
    }
    return result
  })

  useEffect(() => {
    localStorage.setItem(TODO_LIST_STORAGE_KEY, JSON.stringify(todoList))
  }, [todoList])

  return (
    <>
      <AddToDo addTodo={(todo) => setTodoList((prev) => [todo, ...prev])} />
      <div className="flex flex-col w-full py-2 gap-y-2">
        {
          todoList.map((item) => (
            <ToDoItem
              itemData={item}
              key={item.id}
              onDelete={() => setTodoList(
                (prev) => prev.filter((todo) => todo.id !== item.id)
              )}
              onCheck={(id, checked) => setTodoList(
                (prev) => prev
                  .map((todo) => todo.id === id ? { ...todo, completed: checked } : todo)
                  .sort((a, b) => Number(a.completed) - Number(b.completed))
              )}
            />
          ))
        }
      </div>
    </>
  )

}
