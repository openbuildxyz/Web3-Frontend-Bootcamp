import { Button, Form, Input } from "antd";

interface AddToDoProps {
  handleAddItems: (str: string) => void;
}

const AddToDo = ({ handleAddItems }: AddToDoProps) => {
  const [form] = Form.useForm();

  const handleSubmit = () => {
    const todo = form.getFieldValue("todo");
    if (todo) {
      handleAddItems(todo);
      form.resetFields();
    }
  };

  return (
    <Form
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 18,
      }}
      form={form}
    >
      <Form.Item
        name="todo"
        style={{ height: 38, width: "86%", marginRight: 12 }}
      >
        <Input
          accessKey="n"
          autoFocus
          onPressEnter={handleSubmit}
          placeholder="please enter somethings"
        />
      </Form.Item>
      <Button children="記錄代辦" onClick={handleSubmit} />
    </Form>
  );
};

export default AddToDo;
