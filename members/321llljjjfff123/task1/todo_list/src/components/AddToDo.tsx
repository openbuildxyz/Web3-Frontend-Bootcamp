import React from "react";

interface AddToDoProps {
  addToDo: (todo: string) => void
}


// const AddToDo = ({addToDo} ) => {
//   return 
// }

const AddToDo: React.FC<AddToDoProps> = ({ addToDo }) => {
  const [todo, setTodo] = React.useState<string>('');
  

  const handleAddToDo = () => {
    if (todo.trim() === '') {
      alert("请输入任务后提交！！！")
    } else {
      addToDo(todo)
      setTodo('')
    }
  }
  


  return (
    <div>
      <input type="text" value={todo} placeholder="请填写任务" onChange={(e) => setTodo(e.target.value)}/>
      <button onClick={handleAddToDo}>添加任务</button>
    </div>
  )
}
export default AddToDo