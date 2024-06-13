import { Todo } from '../model/todo.ts'

export default function ToDoItem({ data, onAction }: { data: Todo, onAction: (action: string, todo: Todo) => void }) {
  const handleDelete = () => {
    onAction("del", data)
  }

  const handleState = () => {
    data.state = data.state === 1 ? 0 : 1
    onAction("state", data)
  }

  return (
    <div className="todo-item">
      <h2 className="todo-title">{data.title}</h2>
      <p className={`todo-description ${!data.description ? 'placeholder' : ''}`}>
        {data.description || "No description provided"}
      </p>
      <button onClick={handleState} style={{ backgroundColor: data.state ? "#acd793" : "#ff9eaa" }}>{data.state ? "done" : "pending"}</button>
      <button onClick={handleDelete} style={{ backgroundColor: "#eee" }}>delete</button>
      <div className="todo-timestamps">
        <p className="todo-create-time">
          <strong>created:</strong> {data.create_time.toLocaleString()}
        </p>
        <p className="todo-update-time">
          <strong>updated:</strong> {data.update_time.toLocaleString()}
        </p>
      </div>
    </div >
  );
}
