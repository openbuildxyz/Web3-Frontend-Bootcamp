import { useState } from 'react';

interface AddToDoProps {
  onAdd: (text: string) => void;
}

function AddToDo({ onAdd }: AddToDoProps) {
  const [text, setText] = useState<string>('');

  function handleAdd() {
    const resultText = text.trim();
    if (!resultText) return;
    onAdd(resultText);
    setText('');
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    // 判断是否是中文输入法状态下的回车键
    if (event.nativeEvent.isComposing) {
      return;
    }
    if (event.key === 'Enter') {
      event.preventDefault();
      handleAdd();
    }
  }

  return (
    <div className='flex items-stretch gap-2'>
      <input
        className='flex-1 border border-gray-200 p-2 leading-8 rounded-md'
        type='text'
        placeholder='Add a new todo...'
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button className='w-14 bg-gray-300 text-gray-500 rounded-md hover:opacity-80 text-xl' onClick={handleAdd}>
        +
      </button>
    </div>
  );
}

export default AddToDo;
