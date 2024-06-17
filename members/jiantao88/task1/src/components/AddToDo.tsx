import { useState } from "react";
import { Input, Button, Form } from "antd";
interface AddToDoProps {
  addTodo: (text: string) => void;
}
const AddToDo = ({ addTodo }: AddToDoProps) => {
  const [form] = Form.useForm();
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (text.trim()) {
      addTodo(text);
      setText("");
      form.resetFields();
    }
  };

  return (
    <Form
      form={form}
      layout="inline"
      onFinish={handleSubmit}
      style={{ marginBottom: "20px" }}
    >
      <Form.Item>
        <Input
          placeholder="添加新的待办事项"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          添加
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddToDo;
