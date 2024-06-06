import { useState } from 'react'
import "./AddToDo.css";
import { Item } from '../type'

const AddtoDo: React.FC<{ items: Item[], setItems: (value: Array<Item>) => void, maxId: number }> = (props) => {
    const [inputValue, setInputValue] = useState("");
    const handleAdd = () => {
        if (inputValue.trim() === "") return;
        props.setItems([...props.items, { message: inputValue, id: props.maxId + 1, status: false }]);
        setInputValue("");
    }
    return <div className='footer'>
        <input type="text" placeholder="Add ToDo" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
        <button onClick={handleAdd}>Add</button>
    </div>
}
export default AddtoDo;