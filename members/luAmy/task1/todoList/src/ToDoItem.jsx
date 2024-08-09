function ToDoItem({value, status, id, removeItem, toggleStatus}) {
  const valueClassNames = `w-10/12 ${status ? 'text-gray-300 line-through' : ''}`

  function handleRemove(e) {
    e.stopPropagation()
    removeItem(id)
  }
  return (
    <div className="flex border-b border-gray-200 py-2 px-3 cursor-pointer" onClick={() => toggleStatus(id)}>
      <div className={valueClassNames}>{value}</div>
      <div className="w-2/12 text-right text-red-400" onClick={handleRemove}>删除</div>
    </div>
  )
}

export default ToDoItem
