import { set } from "mongoose";

interface AddToDoProps {
  newTodo: string;
  setNewTodo: (value: string) =>void;
  addTodo: () => void;
}

const AddToDo = ({newTodo, setNewTodo, addTodo}: AddToDoProps) => {
  return (
    <div className="flex mt-4">
      <input
      type="text"
      value={newTodo}
      onChange={(e)=> setNewTodo(e.target.value)}
      className="flex-1 border border-gray-300 rounded-l px-2 py-1"
      placeholder="Add a new todo"
      />
      <button 
        onClick={addTodo}
        className="bg-blue-500 text-white px-4 py-1 rounded-r"
      >
        Add Todo
      </button>
    </div>
  );
}
export default AddToDo;