import React, {FC, useState, useEffect} from "react";
import '../index.css';
import '../App.css';
import ToDoItem from "./ToDoItem";
import AddToDo from "./AddToDo";
import { ITask } from './Interfaces';

const ToDoList: FC = () => {

    const [todoList, setTodoList] = useState<ITask[]>([]);

    useEffect(() => {
        const storedTodoList = JSON.parse(localStorage.getItem("todoList") || "[]");
        if(storedTodoList){
            setTodoList(storedTodoList);
        }
        console.log('todoList: ', todoList, storedTodoList);
    }, []);
    
    useEffect(() => {
        setTimeout(() => {
            localStorage.setItem("todoList", JSON.stringify(todoList));
            console.log('todoList 0.5s: ', todoList);
        }, 500);
        // localStorage.setItem("todoList", JSON.stringify(todoList));
        console.log('todoList in set: ', todoList);
    }, [todoList]);

    console.log('load');

    const deleteTask = (taskName: string) => {
        setTodoList(prevTodoList => prevTodoList.filter(task => task.taskName !== taskName));
    };

    const updateTask = (updatedTask: ITask) => {
        setTodoList(prevTodoList => 
            prevTodoList.map(task => 
                task.taskName === updatedTask.taskName ? updatedTask : task
            )
        );
    };

    return (
        <div className="todoList">
            <AddToDo setTodoList={setTodoList}/>
            <ul>
                {/* <ToDoItem/> */}
                {todoList.length > 0 ? (
                    todoList.map((task, index) => ( 
                        <ToDoItem key={index} task={task} deleteTask={deleteTask} updateTask={updateTask} /> 
                    ))
                ): (
                    <li className="noTask">No tasks yet :( <br/>Please add some!</li>
                )}
            </ul>
        </div>
    )
}

export default ToDoList