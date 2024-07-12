/* eslint-disable react/prop-types */
import { useState } from "react"

export default function AddTodo({ addItem }) {
	const [message, setMessage] = useState("")

	function handleChange(e) {
		setMessage(e.target.value)
	}

	function handleClear() {
		setMessage("")
	}

	function handleAdd(message) {
		const newItem = { message: message, id: Math.floor(Math.random() * 10000), isFinished: false }
		addItem(newItem)
	}

	return (
		<div>
			<input
				type="text"
				placeholder="input your todo here"
				value={message}
				onChange={handleChange}
			/>
			<button className="bt" onClick={handleClear}>
				Clear
			</button>
			<button className="bt" onClick={() => handleAdd(message)}>
				Add
			</button>
		</div>
	)
}
