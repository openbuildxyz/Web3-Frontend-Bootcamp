import { todoListItem } from "@/types";
import { XMarkIcon } from '@heroicons/react/24/outline'

interface TodoListItemProps {
    todoItem: todoListItem;
    index: number;
    handleStatusChange: (id: number) => void;
    handleDelete: (id: number) => void;
}

export default function ToDoItem({ todoItem, index, handleStatusChange, handleDelete }: TodoListItemProps) {
    const { id, name, complete } = todoItem;
    return (
        <>
            <li key={id} className="flex justify-between gap-x-6 py-5">
                <div className="flex min-w-0 gap-x-4">
                    <div className="flex min-w-0 flex-auto">
                        <input type="checkbox" defaultChecked={complete} className="hover-pointer mr-5" onClick={() => handleStatusChange(index)} />
                        <p className="text-sm font-semibold leading-6 text-gray-900">{`Task ${index + 1}: ${name}`}</p>
                    </div>
                </div>
                <div className="hidden shrink-0 sm:flex">
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
                    <div className="flex items-center hover-pointer" onClick={() => handleDelete(index)}>
                        <XMarkIcon className="h-4 w-4 ml-4" aria-hidden="true" />
                    </div>
                </div>
            </li>
        </>
    )
}