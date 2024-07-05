import {useTodoItems} from "./TodoListProvider.tsx";
import {ToDoItem} from "./ToDoItem.tsx";


export function ToDoList() {
    const items = useTodoItems();

    return (
        <div>
            {items.map(item => (<ToDoItem key={item.id} item={item}/>))}
        </div>
    )
}