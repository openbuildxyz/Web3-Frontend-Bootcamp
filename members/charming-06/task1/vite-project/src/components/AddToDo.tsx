import { useState } from "react";
// 定义接口
interface AddToDoProps {
    addNewToDo: (msg: string) => void;
}

function AddToDo({ addNewToDo }: AddToDoProps) {
    const [msg, setMsg] = useState('');

    const handleAdd = () => {
        if (msg.trim()) {
            addNewToDo(msg);
            setMsg(''); // 清空输入框
        }
    };
    return (
        <div className="add-to-do">
            <label htmlFor="add">待办描述</label>
            <input value={msg} id="add" type="text" onChange={e => setMsg(e.target.value)} />
            <button onClick={handleAdd}>新增</button>
        </div>
    );


}

export default AddToDo;
