import React, {FC, ChangeEvent, useState} from "react";
import '../index.css';
import '../App.css';
// import {ITask} from './Interfaces';

const AddToDo: FC<{ setTodoList: React.Dispatch<React.SetStateAction<ITask[]>> }> = ({ setTodoList }) => {

    const [popup, setPopup] = useState<boolean>(false);
    const [text, setText] = useState<string>('');
    // const [todoList, setTodoList] = useState<ITask[]>([]);

    const handleChange = () => {
        setPopup(true);
    };

    const handleClose = () => {
        setPopup(false);
    };

    const handleAdd = (): void => {
        const newTask = {taskName: text};
        // setTodoList([...todoList, newTask]);
        setTodoList((prevTodoList) => [...prevTodoList, newTask]);
        setPopup(false);
        // console.log(todoList);
    };

    const handleTxtChange = (event: ChangeEvent<HTMLInputElement>) => {
        // if(event.target.name === "task"){
        //     setText(event.target.value)
        // }
        setText(event.target.value)
    };


    return (
        <div className="addTaskBtn">
            <button onClick={handleChange}>+ Add</button>
            {popup && (
                <div className="popupContainer">
                    <div className="popupContainerInner">
                        <div className="popupContent">
                            <div className="popupPanel">
                                <button onClick={handleClose}>X</button>
                                <div className="popupContentInner">
                                    <input type="text" placeholder="Task..." name="Task" onChange={handleTxtChange}/>
                                </div>
                                <button onClick={handleAdd}>Add Task</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            
        </div>
    )
}

export default AddToDo