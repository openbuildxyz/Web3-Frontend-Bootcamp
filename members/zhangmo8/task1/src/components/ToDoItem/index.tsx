import { TodoItemType, TodoListDispatch } from "~/types";

import type { MouseEvent } from "react";

const ToDoItem = ({ uuid, text, finish, todoList, onSetList }: TodoItemType & TodoListDispatch) => {
  const onChangeStatus = () => {
    const _todoList = [...todoList]
    const item = _todoList.find((item) => item.uuid === uuid) as TodoItemType

    item.finish = item.finish === undefined ? true : !item?.finish 

    onSetList(_todoList)
  }

  const onRemoveTodo = (e: MouseEvent<HTMLButtonElement>) => {
    e?.stopPropagation()

    const _todoList = [...todoList]
    const index = _todoList.findIndex((item) => item.uuid === uuid)

    _todoList.splice(index, 1)
    
    onSetList(_todoList)
  }

  return (
    <li onClick={onChangeStatus} className={`bg-#423a6f rd-2 w-375px p-4 text-6 flex items-center gap-2 cursor-pointer ${finish && 'line-through'}`}>
      <span className="flex-1">{text}</span>
      <button className="icon-btn text-6"  onClick={onRemoveTodo} >
        <div className="i-carbon:trash-can"></div>
      </button>
    </li>
  );
}

export default ToDoItem
