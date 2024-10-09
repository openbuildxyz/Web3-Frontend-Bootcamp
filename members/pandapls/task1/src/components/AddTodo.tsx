import { FC, useState } from "react";

interface AddTodoProps {
  addTodo: (text: string) => void;
}
const AddTodo: FC<AddTodoProps> = (props) => {
  const [text, setText] = useState('');
  const { addTodo } = props;
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return
    addTodo(text);
    setText('');
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="添加待办事项" />
        <button type="submit">
          添加
        </button>
      </form>
    </div>
  )
}

export default AddTodo
