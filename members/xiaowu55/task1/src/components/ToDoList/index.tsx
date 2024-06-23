import { ItemList } from "../../App"
import ToDoItem from "../ToDoItem"


export const ToDoList = (
  { itemList, deleteItemHandle, doneItemHandle }:
    { itemList: ItemList, deleteItemHandle: (id: number) => void, doneItemHandle: (id: number) => void }
) => {

  return (
    <div className="flex flex-col">
      {itemList.map((item) => <ToDoItem deleteItemHandle={deleteItemHandle} doneItemHandle={doneItemHandle} item={item} />)}
    </div>
  )
}
