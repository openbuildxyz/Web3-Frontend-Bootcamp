import "../style/list.css";

function ListComponent({ toDoList, handleValue }) {
  const delItem = (id, type) => {
    handleValue(id, type);
  };

  const doneItem = (id, type) => {
    handleValue(id, type);
  };

  return (
    <div className="list-container">
      {toDoList.length > 0 ? (
        <ul>
          {toDoList.map((item, index) => {
            return (
              <li key={item.id} className={item.isDone ? "done" : null}>
                <span>{item.value}</span>
                <div>
                  <button
                    className="del-btn"
                    onClick={() => delItem(item.id, "delete")}
                  >
                    删除
                  </button>
                  <button
                    className="done-btn"
                    disabled={item.isDone}
                    onClick={() => doneItem(item.id, "done")}
                  >
                    完成
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="empty">当前没有待办任务哦！！！</div>
      )}
    </div>
  );
}

export default ListComponent;
