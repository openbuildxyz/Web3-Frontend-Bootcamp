import { ChangeEvent } from "react";

interface IProps {
  content: { value: string; todo: boolean };
  deleteItem: (val: string) => void;
  changeStatus: (val: string, status: boolean) => void;
}

const ToDoItem: React.FC<IProps> = ({ content, deleteItem, changeStatus }) => {
  const handleDelete = (val: string) => {
    deleteItem(val);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    content: { value: string; todo: boolean }
  ) => {
    changeStatus(content?.value, e.target.checked);
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <input
          type="checkbox"
          onChange={(e) => handleChange(e, content)}
          checked={content.todo}
        ></input>
        {content?.todo ? (
          <del style={{ margin: 0 }}>{content.value}</del>
        ) : (
          <h6 style={{ margin: 0 }}>{content.value}</h6>
        )}
      </div>
      <a
        style={{ cursor: "pointer" }}
        onClick={() => handleDelete(content.value)}
      >
        删除
      </a>
    </div>
  );
};

export default ToDoItem;
