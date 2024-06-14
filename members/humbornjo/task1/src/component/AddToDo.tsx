
import { useState } from 'react';


export default function AddToDo({ onAdd }: { onAdd: (title: string, description: string) => void }) {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const handleAdd = () => {
    onAdd(title, description)
    if (title.trim() !== '') {
      setTitle('');
      setDescription('');
    }
  };

  return (
    <div className="add-todo">
      <input
        type="text"
        placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
}

