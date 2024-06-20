interface PropsType {
  todo: {
    completed: boolean;
    id: number;
    text: string;
  };
  toggleComplete: (params: number) => void;
  deleteTodo: (params: number) => void;
}
const ToDoItem = ({ todo, toggleComplete, deleteTodo }: PropsType) => {
    return (
        <div className="flex justify-between items-center p-2 border-b">
            <span
                className={`flex-1 ${todo.completed ? 'line-through text-gray-500' : ''}`}
                onClick={() => toggleComplete(todo.id)}
            >
                {todo.text}
            </span>
            <button className="text-red-500 hover:text-red-700" onClick={() => deleteTodo(todo.id)}>删除</button>
        </div>
    );
};

export default ToDoItem;