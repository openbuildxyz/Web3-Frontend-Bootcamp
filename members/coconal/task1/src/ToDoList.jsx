/* eslint-disable react/prop-types */
import AddTodo from "./AddTodo"
import ToDoItem from "./ToDoItem"

export default function ToDoList({ items, addItem, removeItem, setItems, handleCheck }) {
	return (
		<main>
			<h1>Let's make a todo list!</h1>
			<AddTodo addItem={addItem} />
			{items ? (
				<ul>
					{items?.map((item, index) => (
						<ToDoItem key={index} item={item} removeItem={removeItem} handleCheck={handleCheck} />
					))}
				</ul>
			) : (
				<p>no items</p>
			)}
		</main>
	)
}
