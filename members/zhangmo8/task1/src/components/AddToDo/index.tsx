import { useRef } from "react";

import { TodoListDispatch } from "~/types";


const AddToDo = ({todoList, onSetList}: TodoListDispatch) => {
  const todoRef = useRef<HTMLInputElement>(null)

  const onAddTodo = () => {
    if (todoRef.current && todoRef.current.value && todoRef.current.value?.trim()) {
      const _todoList = [...todoList]
      _todoList?.push({
        uuid: Date.now().toString(),
        text: todoRef?.current?.value || '',
        finish: false
      })
      onSetList(_todoList)
      todoRef.current.value = ''
    } else {
      alert('Please input todo')
    }
  }

  return (
    <div className=" m-auto flex justify-center w-407px gap-2">
      <input ref={todoRef} className="text-6 flex-1 bg-#131121 p-y-2 p-x-4 rd border-none text-white focus:outline-0" type="text" placeholder="Add todo..." />
      <button onClick={onAddTodo} className="btn text-sm">Submit</button>
    </div>
  );
}

export default AddToDo
