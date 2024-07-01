import {useState} from "react";

export const AddToDo = ({addTodo, todos}) => {
    const [text, setText] = useState('')
    const onSubmit = (e) => {
        e.preventDefault()
        if (text.trim() !== '') {
            addTodo(text)
            setText('')
        }
    }
    return (
        <form onSubmit={onSubmit}>
            <input value={text}
                   id="addTodoInput"
                   name="addTodoInput"
                   placeholder="输入不能为空"
                   onChange={(e) => setText(e.target.value)}
            />
            <button>
                添加第 {todos.length + 1} 个 todo
            </button>
        </form>
    )
}