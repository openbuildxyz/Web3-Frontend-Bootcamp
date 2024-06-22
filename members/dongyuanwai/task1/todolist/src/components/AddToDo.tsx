
export default function AddToDo(
    { newTodo, setNewTodo, addTodo }:
    { newTodo:string, setNewTodo:(text:string)=>void, addTodo:()=>void }
) {
    return (
      <div>
        <input
          type="text"
          placeholder="Add todo..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button 
            style={{ backgroundColor: 'blue', marginLeft:'10px',color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
            onClick={addTodo}
        >
            Add
        </button>
      </div>
    )
  }