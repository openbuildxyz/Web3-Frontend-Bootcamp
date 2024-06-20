
import { useContext  } from 'react'
import TodoContext from "../lib/TodoContext"
import { toast } from 'sonner';
import  ToDoItem from "./ToDoItem" 
export default function ToDoList(){
    
    const {list, setList,setReload} = useContext(TodoContext)
    const onSwitch = (id:number,complated:boolean) =>{
        list[id].complated = complated
        setList(list)
        setReload(true)
        toast.success("Switch success["+id+"]")
    }
    const onDelete = (id:number) =>{
        list.splice(id, 1)
        setList(list)
        setReload(true)
        toast.success("delete success["+id+"]")
    }
    return(<>
    <div className='container mt-5'>
    
      {list.slice().reverse().map((item, index) => ( 
        <ToDoItem 
            key={list.length-1 - index}
            index={list.length-1 - index}
            content={item.content}
            complated={item.complated}
            onSwitch={onSwitch}
            onDelete={onDelete}
        />
     ))} 
    </div>
     
    </>)
}