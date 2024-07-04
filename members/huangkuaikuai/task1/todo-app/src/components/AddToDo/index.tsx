interface AddToDoProps {
    content: string;
    handleContentChange: (value: string) => void;
    handleAddTodo: () => void;
}

export default function AddToDo({ content, handleContentChange, handleAddTodo }: AddToDoProps) {
    return (
        <div className="px-6 mt-6 max-w-2xl flex gap-x-4">
            <input
                value={content}
                onChange={(e) => handleContentChange(e.target.value)}
                id="todo-item"
                name="todo"
                required
                className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-gray shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-lg sm:leading-6"
                placeholder="Enter your to-do"
            />
            <button
                onClick={() => handleAddTodo()}
                type="submit"
                className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
                Add
            </button>
        </div>
    )
}