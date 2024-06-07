import { todoListItem } from "@/types";

interface TodoListItemProps {
    todoItem: todoListItem;
    index: number;
    handleStatusChange: (id: number) => void;
}

export default function ToDoItem({ todoItem, index, handleStatusChange }: TodoListItemProps) {
    const { id, name, complete } = todoItem;
    return (
        <>
            <li key={id} className="flex justify-between gap-x-6 py-5" onClick={()=>handleStatusChange(index)}>
                <div className="flex min-w-0 gap-x-4">
                    <div className="min-w-0 flex-auto">
                        <p className="text-sm font-semibold leading-6 text-gray-900">{`Task ${index + 1}: ${name}`}</p>
                    </div>
                </div>
                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                    {complete ? (
                        <p className="mt-1 text-xs leading-5 text-emerald-500">
                            Completion
                        </p>
                    ) : (
                        <div className="mt-1 flex items-center gap-x-1.5">
                            <div className="flex-none rounded-full bg-yellow-500/20 p-1">
                                <div className="h-1.5 w-1.5 rounded-full bg-yellow-500" />
                            </div>
                            <p className="text-xs leading-5 text-yellow-500">Unfinished</p>
                        </div>
                    )}
                </div>
            </li>
        </>
    )
}