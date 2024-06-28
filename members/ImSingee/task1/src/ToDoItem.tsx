import {Item} from "./todo.ts";

export type Props = {
    item: Item
}

export function ToDoItem({item}: Props) {
    return <div>{item.title}</div>
}