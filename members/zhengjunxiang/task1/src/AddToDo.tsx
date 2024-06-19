import {useRef} from 'react';
const AddToDo = ({onAddItem}) => {
    const inputRef = useRef();

    const handleAdd = () => {
        onAddItem(inputRef.current.value)
        inputRef.current.value = ''
    }
    return (
        <div>
        <input type="text" ref={inputRef} />
        <button onClick={handleAdd}>Add</button>
        </div>
    );
}

export default AddToDo;