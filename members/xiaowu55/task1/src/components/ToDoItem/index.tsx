import { Item } from "../../App";


const ToDoItem = ({ item, deleteItemHandle, doneItemHandle }: { item: Item, deleteItemHandle: (id: number) => void, doneItemHandle: (id: number) => void }) => {

  return (
    <div className="text-2xl flex gap-4 py-2">
      <span>{item.itemContent}</span>
      <span>{item.done ? '已完成' : '未完成'}</span>
      <button onClick={() => deleteItemHandle(item.id)} className="bg-red-400 rounded-full w-8 h-8">
        X
      </button>
      <button onClick={() => doneItemHandle(item.id)} className="flex bg-green-400 rounded-full">
        switch state
      </button>
    </div>
  );
};

export default ToDoItem;
