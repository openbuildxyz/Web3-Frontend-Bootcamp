import { Input, Button, Switch } from "antd";
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

type itemTask = {
  task: string;
  isDone: boolean;
};

export default function ToDoList(props: {
  toDoList: itemTask[];
  updateToDoList: (item: itemTask[]) => void;
}) {
  const { toDoList, updateToDoList } = props;

  const deleteItem = (index: number) => {
    const array: itemTask[] = toDoList.filter((item, i) => i !== index);
    updateToDoList(array);
  };

  const updateTask = (value: string, index: number) => {
    const data = toDoList.map((item, i) => {
      if (i===index) {
        return { ...item, task: value,};
      } else {
        return item;
      }
    })
    updateToDoList(data);
  };

  const handleCheck= (checked: boolean, index: number) => {
    const data = toDoList.map((item, i) => {
      if (i===index) {
        return { ...item, isDone: checked,};
      } else {
        return item;
      }
    })
    updateToDoList(data);
  }
  return (
    <div>
      {toDoList.map((item, index) => (
        <div className="add-todo-row" style={{ marginBottom: "8px" }} key={index}>
          <Input
            value={item.task}
            onChange={(e) => updateTask(e.target.value, index)}
            style={{ marginRight: "8px" }}
          />
          <Switch
          checkedChildren={<CheckOutlined />}
           unCheckedChildren={<CloseOutlined />}
           defaultValue={item.isDone}
            style={{ marginRight: "8px" }}
            onClick={(checked: boolean) => handleCheck(checked, index)}
            />
          <Button onClick={() => deleteItem(index)} type="primary">
            删除
          </Button>
        </div>
      ))}
    </div>
  );
}
