interface AddToDoProps {
  newTodo: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddClick: () => void;
}
const AddToDo: React.FC<AddToDoProps> = ({ newTodo, handleInputChange, handleAddClick }) => {
  return (
    <div>
      <input type="text" value={newTodo} onChange={handleInputChange} placeholder="Enter new todo" />
      <button onClick={handleAddClick}>Add</button>
    </div>
  );
};

export default AddToDo