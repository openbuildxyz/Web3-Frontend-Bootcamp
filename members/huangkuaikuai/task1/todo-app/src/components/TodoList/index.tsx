import { todoListItem } from "@/types";
import ToDoItem from "../ToDoItem";

interface TodoListProps {
    data: todoListItem[];
    handleStatusChange: (index: number) => void;
}

export default function TodoList({ data, handleStatusChange }: TodoListProps) {
    return (
        <ul role="list" className="mt-6 divide-y divide-gray-100 hover-pointer">
            {data.map((todoItem, index) => (
                <ToDoItem key={todoItem.id} index={index} todoItem={todoItem} handleStatusChange={handleStatusChange} />
            ))}
        </ul>
    )
}
