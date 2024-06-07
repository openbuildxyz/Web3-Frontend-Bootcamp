import { todoListItem } from "@/types";
import ToDoItem from "../ToDoItem";

interface TodoListProps {
    data: todoListItem[];
    handleStatusChange: (index: number) => void;
    handleDelete: (index: number) => void;
}

export default function TodoList({ data, handleStatusChange, handleDelete }: TodoListProps) {
    return (
        <ul role="list" className="mt-6 divide-y divide-gray-100">
            {data.map((todoItem, index) => (
                <ToDoItem key={todoItem.id} index={index} todoItem={todoItem} handleDelete={handleDelete} handleStatusChange={handleStatusChange} />
            ))}
        </ul>
    )
}
