import { useEffect } from "react"


interface Todo {
  id: number;
  text: string;
  complete: boolean;
}

interface ToDoItemProps {
  list: Todo[]
  setList: React.Dispatch<React.SetStateAction<Todo[]>>
}

const ToDoItem: React.FC<ToDoItemProps> = ({list, setList }) => {

  // 修改完成状态的方法
  const ifaCcomplish = (id: number) => {
    setList(
      list.map((todo) => {
        console.log(todo)
        return todo.id === id ? {...todo, complete: !todo.complete} : todo
      }
      )
    )
  }

  // 删除方法
  const deletToDo = (id: number) => {
    setList(
      list.filter((todo) => {
        return todo.id !== id
      })
    )
  }

  useEffect(() => {
    localStorage.removeItem("todos")
    console.log(localStorage.getItem("todos"))
    
    localStorage.setItem("todos", JSON.stringify(list))
    console.log(localStorage.getItem("todos"))
  }, [list])

  return (
    <div >
      {list.map((todo) => (
        <div key={todo.id} >
          <ol type="1">
              <li>{todo.text}</li>
              <li onClick={() => ifaCcomplish(todo.id as number)}>{todo.complete ? "完成" : "未完成"}</li>
              <button  onClick={(event) => {
                event.stopPropagation()
                deletToDo(todo.id)
              }}>删除</button>
          </ol>
        </div>
      ))}
    </div>
  )
}

export default ToDoItem