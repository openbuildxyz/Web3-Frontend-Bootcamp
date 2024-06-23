export default function ({ todoItem, index, onDoOK, onDel }) {
  return (
    <div
      style={{
        display: "flex",
        width: "250px",
              justifyContent: "space-between",
        marginTop:'3px'
      }}
    >
      <div style={{ display: "flex" }}>
        <input
          type="checkbox"
          defaultChecked={todoItem.isOK}
          onClick={() => {
            onDoOK(index);
          }}
        />
        <div
          style={{
            marginLeft: "5px",
            marginRight: "80px",
            textDecoration: todoItem.isOK ? "line-through" : "none",
            color: todoItem.isOK ? "gray" : "black",
          }}
        >
          {todoItem.label}
        </div>
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
