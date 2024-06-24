function ToDoItem({ item, onToggle, onDelete }) {
  return (
    <li
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "10px",
        backgroundColor: "#444455",
        padding: "10px",
        borderRadius: "5px",
      }}
    >
      <input
        type="checkbox"
        checked={item.completed}
        onChange={() => onToggle(item.id)}
        style={{ marginRight: "10px" }}
      />
      <span
        style={{
          textDecoration: item.completed ? "line-through" : "none",
          flex: 1,
          color: item.completed ? "#aaaaaa" : "#ffffff",
        }}
      >
        {item.text}
      </span>
      <button
        onClick={() => onDelete(item.id)}
        style={{
          background: "#666677",
          color: "white",
          border: "none",
          borderRadius: "5px",
          padding: "8px 16px",
          cursor: "pointer",
        }}
      >
        删除
      </button>
    </li>
  );
}

export default ToDoItem;
