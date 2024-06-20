export default function ({ todoItem, index, onDoOK, onDel }) {
  return (
    <div style={{ display: "flex" }}>
      <input
        type="checkbox"
        defaultChecked={todoItem.isOK}
        onClick={() => {
          onDoOK(index);
        }}
      />
      <div style={{ marginLeft: "5px", marginRight: "80px" }}>
        {todoItem.label}
      </div>
      <button
        onClick={() => {
          onDel(index);
        }}
      >
        x
      </button>
    </div>
  );
}
