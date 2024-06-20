
function ToDoList({children}: {children: React.ReactNode}) {
  return (
    <ul className="flex flex-col gap-2 mt-4">
      {children}
    </ul>
  )
}

export default ToDoList