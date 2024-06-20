import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface AddToDoProps {
  addTodo: (text: string) => void;
}
const AddToDo: React.FC<AddToDoProps> = ({ addTodo }) => {
  const [text, setText] = useState("");
  const handleSubmit = () => {
    if (!text) return;
    addTodo(text);
    setText("");
  };

  return (
    <div className="flex items-center gap-2 w-full">
      <Input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new task..."
      />
      <Button disabled={!text} onClick={handleSubmit}>
        Add ToDo
      </Button>
    </div>
  );
};

export default AddToDo;
