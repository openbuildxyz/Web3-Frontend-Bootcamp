import { useEffect, useState } from "react"
import Hearder from "./Hearder"
import ToDoList from "./ToDoList"
import "./style.css"

export default function App() {
	const [items, setItems] = useState([])

	useEffect(() => {
		const localitems = localStorage.getItem("items")
		if (localitems) {
			setItems(JSON.parse(localitems))
		}
	}, [])

	function addItem(item) {
		if (item.message === "") return
		const newItems = [...items, item]
		setItems(newItems)
		localStorage.setItem("items", JSON.stringify(newItems))
	}

	function removeItem(id) {
		const newItems = items.filter((item) => item.id !== id)
		setItems(newItems)
		localStorage.setItem("items", JSON.stringify(newItems))
	}

	function handleCheck(id, isFinished) {
		const newItems = items.map((item) => {
			if (item.id === id) {
				item.isFinished = isFinished
			}
			return item
		})
		setItems(newItems)
		localStorage.setItem("items", JSON.stringify(newItems))
	}

	return (
		<div>
			<Hearder />
			<ToDoList items={items} addItem={addItem} removeItem={removeItem} handleCheck={handleCheck} />
		</div>
	)
}
