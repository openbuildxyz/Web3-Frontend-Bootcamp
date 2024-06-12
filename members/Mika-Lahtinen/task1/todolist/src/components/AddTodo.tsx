const AddTodo = ({ newTodo, setNewTodo, addTodo }) => {
    return (
        <>
            <div>
                <input
                    type="text"
                    placeholder="New todo plz..."
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                />
            </div>
            <br />
            <div>
                <button onClick={addTodo}>Add it</button>
            </div>
        </>);
};

export default AddTodo