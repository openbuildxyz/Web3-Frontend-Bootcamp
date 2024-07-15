import { useState } from 'react'

interface PropsType {
  addTodo: (params: string) => void
};

{/* AddToDo component: add new todo-item */}
const AddToDo = ({ addTodo } : PropsType) => {
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (content.trim()) {
      // read item value, add to item list
      addTodo(content);
      // reset input to null
      setContent('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Add todo item"
      />
      <button type="submit">Add</button>
    </form>
  );
}

export default AddToDo