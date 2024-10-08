
import ToDoItem from "./ToDoItem"

export default function ToDoList({ todoList, onFinish, onDel }) {
    const finish = (index) => {
        return () => {
            onFinish(index)
        }
    }
    const del = (index) => {
        return () => {
            onDel(index)
        }
    }
    return (
        <>
            <ul>
                {
                    todoList.map((item, index) => {
                        return <ToDoItem del={del(index)} finish={finish(index)} key={index} >{item.name}x{item.status ? '已完成' : '未完成'}</ToDoItem>
                    })
                }
            </ul>
        </>
    )
}