import ToDoItem from './ToDoItem';

interface PropsType {
  todos: {
    completed: boolean;
    id: number;
    text: string;
  }[];
  toggleComplete: (params: number) => void;
  deleteTodo: (params: number) => void;
}

const ToDoList = ({ todos, toggleComplete, deleteTodo }: PropsType) => {
    return (
        <div className="max-w-md mx-auto mt-4">
            {todos.map((todo) => (
                <ToDoItem
                    key={todo.id}
                    todo={todo}
                    toggleComplete={toggleComplete}
                    deleteTodo={deleteTodo}
                />
            ))}
        </div>
    );
};

export default ToDoList;