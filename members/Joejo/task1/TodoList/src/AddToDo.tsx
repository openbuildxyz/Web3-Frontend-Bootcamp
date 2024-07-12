import { useState } from "react";

const AddToDo = (props: {
  onAdd: (item: string) => void,
}) => {
  const [text, setText] = useState('');
  const { onAdd } =  props;

  const _onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.trim();

    setText(val);
  };

  return (
    <div className="add-todo">
      <input
        className="add-todo_text"
        maxLength={30}
        value={text}
        placeholder="请输入待办事项"
        onInput={_onInput}
      />
      <button className="add-todo_btn" onClick={() => { onAdd(text) }}>添加</button>
    </div>
  );
};

export default AddToDo;