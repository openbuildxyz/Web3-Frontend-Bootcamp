import { createContext  } from 'react'
import {ToDoItem } from "../lib/data/interface";
type todoDataCtx = {
    list: ToDoItem[];
    setList: (todo:ToDoItem[]) => void;
    reload:boolean;
    setReload:(r:boolean) => void;
}
const ToDoContext = createContext<todoDataCtx>({} as todoDataCtx)

export default ToDoContext;