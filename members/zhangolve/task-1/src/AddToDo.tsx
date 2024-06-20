import {useRef} from 'react';
const AddToDo = ({onAddItem}) => {
    const inputRef = useRef();
    return (
        <div>
        <input type="text" ref={inputRef} />
        <button onClick={()=>onAddItem(inputRef.current.value)}>Add</button>
        </div>
    );
}

export default AddToDo;