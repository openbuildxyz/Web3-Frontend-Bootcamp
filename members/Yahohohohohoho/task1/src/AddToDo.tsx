import { Input, Button } from "antd";
import "./style.css";
import { useState } from 'react';

type AddItemToListType = (item: {task: string, isDone: boolean}) => void;

export default function AddToDo(props: {addItemToList: AddItemToListType}) {
    const { addItemToList } = props;
    const [text, setText] = useState('');
    const addTodo = () => {
        addItemToList({task: text, isDone: false})
        setText("");
    }

    return (
    <div className="add-todo-row">
        <Input value={text} onChange={(e) => setText(e.target.value)}  placeholder="添加待办事项"  style={{ marginRight: '8px', marginBottom: "8px" }}   />
        <Button  onClick={addTodo} type="primary">Add</Button>
    </div>
    )
}