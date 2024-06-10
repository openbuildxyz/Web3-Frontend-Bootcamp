import {Input,Button} from "@nextui-org/react";
import TodoContext from "../lib/TodoContext"
import { useState,useContext } from "react"
import {ToDoItem } from "../lib/data/interface";
import { toast } from 'sonner';

export default function AddToDo(){
    const {list,setList,setReload} = useContext(TodoContext)
    const [todo,setTodo] = useState("")
    const addToDo = ()=>{
        const newTodo = {content:todo,complated:false} as ToDoItem
        const newData = [...list,newTodo]
        setList(newData)
        setTodo("")
        setReload(true)
        toast.success("Add success ")
    }

    return(<>
    <div className="container my-5">
        <div className="flex flex-row  justify-center gap-4">
            <Input type="text" isClearable label="Add To Do" value={todo} onValueChange={setTodo}  className="basis-1/2"  />
            <Button radius="full" onClick={addToDo}   className="bg-sky-200 hover:bg-sky-400 my-auto px-20">
            Submit
            </Button>
        </div>
    </div>
    </>)
}