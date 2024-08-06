import { useEffect } from "react";
import ToDoItem from "./todo-item";
import { localStroage } from "../utils";
type TodoProps = {
  id: number;
  text: string;
  isCompleted: boolean;
}
type ToDoListProps = {
  todolist: TodoProps[],
  setToDoList: Function;
}

const ToDoList: React.FC<ToDoListProps> = ({ todolist, setToDoList }) => {

  useEffect(() => {
    localStroage.set("todolist", todolist);
  }, [todolist])

  const handleToggle = (id: number, isCompleted: boolean) => {
    const newTodoList = todolist.map(todo => {
      if (todo.id === id) {
        todo.isCompleted = isCompleted;
      }
      return todo;
    })
    setToDoList(newTodoList);
  }

  const handleDelete = (id: number) => {
    const newTodoList = todolist.filter(todo => todo.id !== id);
    setToDoList(newTodoList);
  }
  const ToDo = () => {
    return (
      <div className="grid grid-cols-1 gap-2">
        {
          todolist.map(todo => {
            return (
              <ToDoItem
                id={todo.id}
                key={todo.id}
                text={todo.text}
                isCompleted={todo.isCompleted}
                onToggle={(isCompleted: boolean) => handleToggle(todo.id, isCompleted)}
                onDelete={() => handleDelete(todo.id)}
              />
            )
          })
        }
      </div>
    )
  }
  return (
    <div>
      <ToDo />
    </div>
  )
}

export default ToDoList;