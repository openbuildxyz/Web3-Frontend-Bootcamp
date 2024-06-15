import { useCallback, useState } from "react";

interface AddToDoProps {
  addToDo: (text: string) => void
}

const AddToDo: React.FC<AddToDoProps> = ( props ) => {
  const { addToDo } = props;

  const [text, setText] = useState<string>('');
  

  const handleAddText = useCallback(() => {
    const newText = text.trim();
    if (!newText) {
      return;
    } else {
      addToDo(newText);
      setText('');
    }
  },[text]);

  const handleChangeText = useCallback((e: KeyboardEvent) => {
    const newText: string = (e.target as HTMLInputElement).value;
    if (e.key === 'Enter') {
      handleAddText();
    } else {
      setText(newText);
    }
  },[text, handleAddText]);
  
  return (
    <div className="flex justify-center items-center gap-2 w-full">
      <input type="text" required value={text} onKeyDown={(e) => handleChangeText(e as unknown as KeyboardEvent)} onInput={handleAddText} placeholder="Add a new task..." />
      <button disabled={!text} onClick={handleAddText}>+</button>
    </div>
  )
}
export default AddToDo