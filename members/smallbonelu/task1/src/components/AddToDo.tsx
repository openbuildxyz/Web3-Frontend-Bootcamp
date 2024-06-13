import { useRef } from "react"

type AddToDoProps = {
  onAdd: (text: string) => void
}
function AddToDo({
  onAdd}: AddToDoProps) {

  const inputRef = useRef<HTMLInputElement>(null);

  function addItem() {
    onAdd(inputRef.current!.value)
    inputRef.current!.value = ''
  }

  return (
    <div className='flex items-center'>
      <input ref={inputRef} type="text" className='flex-1 border border-gray-300 rounded p-2 mr-2' placeholder='Add new item' onKeyDown={(e) => e.key === 'Enter' && addItem()} />
      <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={addItem}>Add</button>
    </div>
  )
}

export default AddToDo