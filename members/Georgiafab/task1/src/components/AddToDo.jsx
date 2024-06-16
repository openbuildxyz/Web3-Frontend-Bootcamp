import {useState} from 'react';
import PropTypes from 'prop-types';
export default function AddToDo({addTodo}) {
    const [text, setText] = useState('')
    const handleAddTodo = () => {
        addTodo({
            desc: text,
            id: new Date().getTime(),
            done: false
        })
        setText('')
    }
    return <>
        <input type="text" value={text} onInput={(e) => setText(e.currentTarget.value)} placeholder="please enter"/> 
        <button onClick={handleAddTodo}>add</button>
    </>
} 
AddToDo.propTypes = {
    addTodo: PropTypes.func
  }