interface Props {
  inputText: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAdd: () => void;
}

export default function AddToDo({ inputText, onChange, handleAdd }: Props) {
  return (
    <div>
      <input
        className="border"
        type="text"
        value={inputText}
        onChange={onChange}
      />
      <button className="ml-2" onClick={handleAdd}>
        Add
      </button>
    </div>
  );
}
