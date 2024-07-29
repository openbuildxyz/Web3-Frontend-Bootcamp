import type { TableProps } from 'antd';
import {
  Button, Form, Input, Modal, Table,
} from 'antd';
import { useEffect, useState } from 'react';
import store2 from 'store2';

interface DataType {
  key?: string;
  name: string;
  states: number;
}

/** 展示所有待办事项 */
function ToDoList() {
  // 使用useState钩子来管理待办事项的数据状态
  const [data, setData] = useState([]);
  // 使用useState钩子来管理模态框的打开状态
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 使用Form.useForm()来创建表单实例
  const [form] = Form.useForm();

  /**
   * 打开模态框
   * 该函数用于触发模态框的显示，以便用户可以添加新的待办事项
   */
  const showModal = () => {
    setIsModalOpen(true);
  };

  /**
   * 处理确认按钮的点击事件
   * 该函数用于提交表单，验证字段，并将新的待办事项添加到列表中
   */
  const handleOk = async () => {
    form.submit();
    // 等待表单验证并获取名称字段的值
    const { name }: { name: string } = await form.validateFields();
    // 如果名称字段为空，则不执行任何操作并返回
    if (!name) return;
    // 获取当前的待办事项列表，如果不存在则初始化为空数组
    const todoList = data;
    // 将新的待办事项添加到列表中
    todoList.push({ name, states: false });
    // 更新待办事项的数据状态
    setData([...todoList]);
    // 重置表单字段
    form.resetFields();
    // 关闭模态框
    setIsModalOpen(false);
  };

  /**
   * 删除待办事项
   * @param index 待删除待办事项的索引
   * 该函数用于从列表中删除指定的待办事项
   */
  const onDelete = (index: number) => {
    // 获取当前的待办事项列表，如果不存在则初始化为空数组
    const todoList = data;
    // 从列表中移除指定索引的待办事项
    todoList.splice(index, 1);
    // 更新待办事项的数据状态
    setData([...todoList]);
  };

  /**
   * 改变待办事项的状态
   * @param index 待改变状态的待办事项的索引
   * 该函数用于改变指定待办事项的状态（已完成或未完成）
   */
  const onCompleted = (index: number) => {
    // 获取当前的待办事项列表，如果不存在则初始化为空数组
    const todoList = data;
    // 更新指定索引的待办事项的状态
    todoList[index] = {
      ...todoList[index],
      states: !todoList[index].states,
    };
    // 更新待办事项的数据状态
    setData([...todoList]);
  };

  /**
   * 关闭模态框
   * 该函数用于关闭模态框，通常在点击取消按钮时调用
   */
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // 定义表格的列配置
  const columns: TableProps<DataType>['columns'] = [
    {
      title: '#',
      align: 'center',
      // 自定义列渲染，用于显示待办事项的序号
      render: (a, b, i) => <p>{i + 1}</p>,
    },
    {
      title: '名称',
      dataIndex: 'name',
      align: 'center',
    },
    {
      title: '状态',
      dataIndex: 'states',
      align: 'center',
      // 自定义列渲染，用于显示待办事项的状态文本
      render: (states: string) => (states ? '已完成' : '未完成'),
    },
    {
      title: '操作',
      align: 'center',
      // 自定义列渲染，用于显示删除和更改状态的操作按钮
      render: (...row: any) => (
        <>
          <Button type="link" onClick={() => onDelete(row[2])}>
            删除
          </Button>
          <Button type="link" onClick={() => onCompleted(row[2])}>
            更改状态
          </Button>
        </>
      ),
    },
  ];

  useEffect(() => {
    // 获取数据
    const todoList = store2('todoList');
    if (todoList?.length) {
      setData(todoList);
    }
    return () => {
      store2('todoList', todoList);
    };
  }, []);

  return (
    <>
      <div className="">
        <Button type="primary" className="mb-2" onClick={showModal}>
          添加待办事项
        </Button>
      </div>
      <Table columns={columns} dataSource={data} rowKey="name" />

      <Modal title="添加待办事项" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form name="basic" form={form}>
          <Form.Item
            label="待办事件"
            name="name"
            rules={[
              {
                required: true,
                validator: (rule, value) => {
                  const todoList = data;
                  if (todoList.some((v) => v.name === value)) {
                    return Promise.reject(new Error('待办事件已存在'));
                  }
                  if (!value) {
                    return Promise.reject(new Error('请输入待办事件名称'));
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Input placeholder="请输入待办事件名称" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default ToDoList;
