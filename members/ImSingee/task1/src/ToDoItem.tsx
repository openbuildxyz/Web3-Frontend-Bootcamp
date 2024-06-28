import {Item} from "./todo.ts";
import {useSetTodoItems} from "./TodoListProvider.tsx";

export type Props = {
    item: Item
}

export function ToDoItem({item}: Props) {
    const setItems = useSetTodoItems()

    function handleDelete() {
        setItems((items) => items.filter((i) => i !== item))
    }

    return (
        <div className="flex">
            <label>
                <input type="checkbox" checked={item.completed}/>
                {item.title}
            </label>
            <div className="delete" onClick={handleDelete}>Delete</div>
        </div>
    )
}