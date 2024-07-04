import { useState } from 'react'
import style from './index.module.css'

const AddToDo = (props) => {
    const {onAddToDo} = props
    const [inputText, setInputText] = useState("")

    const handleAdd = () => {
        if (inputText) {
            onAddToDo(inputText)
        } else {
            alert("请输入内容!")
        }
    }

    return <div className={style.addBox}>
        <input 
            type="text" 
            value={inputText}
            className={style.addInput} 
            placeholder='请输入待办事项'
            onChange={(e) => {
                setInputText(e.target.value)
            }}
        />
        <button className={style.addBtn} onClick={() => handleAdd() }>添加</button>
    </div>
}

export default AddToDo