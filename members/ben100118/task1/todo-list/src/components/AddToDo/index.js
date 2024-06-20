import React,{useState} from "react"
import { nanoid } from 'nanoid';
import './index.css'
const AddToDo = ({addTodo}) => {
    const [text, setText] = useState('')

    const handleAdd = () => {
        if (!text.trim()) {
            return alert("输入不能为空");
          }
          const todo = { id: nanoid(), text: text, isDone: false };
          // 插入ToDo对象
          addTodo(todo);
          // 清空输入
          setText('');
    }
    return (
        <div className="todo-header">
            <input
                type="text"
                placeholder="请输入你的任务名称"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <button class="btn btn-primary" onClick={() => handleAdd()}>添加</button>
        </div>
    )
};

export default AddToDo