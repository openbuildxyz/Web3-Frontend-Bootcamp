function ToDoItem({ item, onDelete, onToggle }) {
  return (
    <li
      style={{
        backgroundColor: "#fff",
        margin: "8px 0",
        padding: "10px",
        borderRadius: "5px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <span
        onClick={() => onToggle(item.id)}
        style={{
          textDecoration: item.completed ? "line-through" : "none",
          flexGrow: 1,
          cursor: "pointer",
        }}
      >
        {item.text}
      </span>
      <div>
        <button
          onClick={() => onToggle(item.id)}
          style={{
            backgroundColor: item.completed ? "#4CAF50" : "#f0ad4e", // Green when completed, orange otherwise
            color: "white",
            padding: "5px 10px",
            border: "none",
            borderRadius: "5px",
            marginRight: "5px",
            cursor: "pointer",
          }}
        >
          {item.completed ? "未完成" : "完成"}
        </button>
        <button
          onClick={() => onDelete(item.id)}
          style={{
            backgroundColor: "#d9534f", // Red for delete
            color: "white",
            padding: "5px 10px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          删除
        </button>
      </div>
    </li>
  );
}

export default ToDoItem;
