import { useState } from "react"
interface AddTodoProps {
  addTodo: (text:string)=>void
}
function AddTodo({addTodo}:AddTodoProps ) {
  const [text,setText] = useState('')
  const handleSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
  if(text.trim() == ''){
    return
  }
addTodo(text)
setText('')
  }
    return (
      <form onSubmit={handleSubmit}>
        <input type="text" 
        value={text}
        onChange={(e)=>setText(e.target.value)}
        />
        <button >新建事务</button>
      </form>
    )
}
export default AddTodo