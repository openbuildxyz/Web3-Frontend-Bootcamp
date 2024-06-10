"use client";

// 导入必要的库和组件
import { FiPlusCircle } from "react-icons/fi";
import Modal from './Modal';
import { FormEventHandler, useState } from 'react';
import { addTodo } from '../../api';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from "uuid";

// 定义AddTask组件
const AddTask = () => {
  const router = useRouter();
  const [addModalOpen, setAddModalOpen] = useState<boolean>(false);
  const [newTaskValue, setNewTaskValue] = useState<string>("");
  
  // 处理提交新任务的函数
  const handleNewTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await addTodo({
      id: uuidv4(),
      text: newTaskValue,
    });
    setNewTaskValue("");
    setAddModalOpen(false);
    router.refresh();
  };
  
  // 返回组件的JSX结构
  return (
      <div>
        {/* 添加任务按钮 */}
        <button className="btn btn-primary w-full" onClick={() => setAddModalOpen(true)}>
          添加任务<FiPlusCircle size={18} />
        </button>
        
        {/* 模态框组件 */}
        <Modal modalOpen={addModalOpen} setModalOpen={setAddModalOpen}>
          <form onSubmit={handleNewTodo}>
            <h3 className="font-bold text-lg">添加新任务</h3>
            <div className="modal-action">
              <input
                  value={newTaskValue}
                  onChange={(e) => setNewTaskValue(e.target.value)}
                  type="text"
                  placeholder="在这写你的任务"
                  className="input input-bordered w-full"
              />
              <button type="submit" className="btn btn-primary">
                <FiPlusCircle size={18} />
              </button>
            </div>
          </form>
        </Modal>
      </div>
  );
};

// 导出AddTask组件
export default AddTask;
