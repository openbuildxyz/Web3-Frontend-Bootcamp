import { ItemList } from "../../App"
import ToDoItem from "../ToDoItem"


export const ToDoList = (
  { itemList, deleteItemHandle, doneItemHandle }:
    { itemList: ItemList, deleteItemHandle: (id: number) => void, doneItemHandle: (id: number) => void }
) => {

  return (
    <div className="flex flex-col py-5">
      {itemList.map((item) => <ToDoItem key={item.id} deleteItemHandle={deleteItemHandle} doneItemHandle={doneItemHandle} item={item} />)}
    </div>
  )
}
