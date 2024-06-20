import { ToDoItem } from './ToDoItem';

 function ToDoList({ todos, handleDeleteTodo, handleToggleComplete, handleToggleUncomplete }) {
	return (
		<>
            <ul>
		{todos.map((todo, index) => (
            
			<ToDoItem key={index} todo={todo} index={index} handleDeleteTodo={handleDeleteTodo} handleToggleComplete={handleToggleComplete} handleToggleUncomplete={handleToggleUncomplete} />
		))}
            </ul>
        </>
	);
}

export { ToDoList };  
