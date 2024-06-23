import { useState } from "react"
import AddToDo from "./components/AddToDo"
import { Header } from "./components/Header"
import { ToDoList } from "./components/ToDoList"

export interface Item {
  id: number
  itemContent: string
  done: boolean
}

export type ItemList = Item[]

function App() {
  const [itemList, setItemList] = useState<Item[]>([])

  function deleteItemHandle(id: number) {
    setItemList(itemList.filter(item => !(item.id === id)))
  }

  function doneItemHandle(id: number) {
    setItemList(
      itemList.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item
      )
    )
  }

  function addItemHandle(itemContent: string) {
    !!itemContent && setItemList([...itemList, { itemContent, id: itemList.length + 1, done: false }])
  }

  return (
    <div className="flex items-center justify-center flex-col">
      <Header></Header>
      <AddToDo addItemHandle={addItemHandle} ></AddToDo>
      <ToDoList itemList={itemList} deleteItemHandle={deleteItemHandle} doneItemHandle={doneItemHandle} ></ToDoList>
    </div>
  )
}

export default App
