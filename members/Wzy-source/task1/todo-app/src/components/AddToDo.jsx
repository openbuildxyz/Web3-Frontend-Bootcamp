export default function AddToDo({ newTodo, setNewTodo, addTodo }) {
  return (
    <div>
      <input
        type="text"
        placeholder="Add todo..."
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button onClick={addTodo}>Add</button>
    </div>
  )
}
