/* eslint-disable react/prop-types */
export default function ToDoItem({ item, removeItem, handleCheck }) {
	const handleChange = (e) => {
		console.log(e.target.checked)
		handleCheck(item.id, e.target.checked)
	}
	return (
		<div>
			<input type="checkbox" checked={item.isFinished} onChange={(e) => handleChange(e)} />
			<span style={{ textDecoration: item.isFinished ? "line-through" : "none" }}>
				{item.message}
			</span>
			<button className="deletebutton" onClick={() => removeItem(item.id)}>
				X
			</button>
		</div>
	)
}
