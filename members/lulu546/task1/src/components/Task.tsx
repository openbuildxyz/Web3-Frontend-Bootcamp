import { ITask } from "../../types/tasks";
import { FormEventHandler, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Modal from "./Modal";
import { deleteTodo, editTodo } from "../../api";
import useTaskStore from '../store/index';

interface TaskProps {
  task: ITask;
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<string>(task.text);
  const triggerRefresh = useTaskStore(state => state.triggerRefresh);
  
  const handleEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await editTodo({
      id: task.id,
      text: taskToEdit,
    });
    setEditModalOpen(false);
    triggerRefresh();
  }
  
  const handleDeleteTodo = async (id: string) => {
    await deleteTodo(id);
    setDeleteModalOpen(false);
    triggerRefresh();
  }
  
  return (
      <tr key={task.id}>
        <td className="w-full">{task.text}</td>
        <td className="flex gap-5">
          <FiEdit
              className="text-blue-500"
              onClick={() => setEditModalOpen(true)}
              cursor="pointer"
              size={20}
          />
          <Modal modalOpen={editModalOpen} setModalOpen={setEditModalOpen}>
            <form onSubmit={handleEditTodo}>
              <h3 className="font-bold text-lg">编辑任务</h3>
              <div className="modal-action">
                <input
                    value={taskToEdit}
                    onChange={(e) => setTaskToEdit(e.target.value)}
                    type="text"
                    placeholder="输入你想改的事项"
                    className="input input-bordered w-full"
                />
                <button type="submit" className="btn btn-primary">
                  提交
                </button>
              </div>
            </form>
          </Modal>
          <FiTrash2
              className="text-red-500"
              onClick={() => setDeleteModalOpen(true)}
              cursor="pointer"
              size={20}
          />
          <Modal modalOpen={deleteModalOpen} setModalOpen={setDeleteModalOpen}>
            <h3 className="font-bold text-lg">删除任务</h3>
            <div className="flex flex-col justify-between modal-action">
              <h4 className="text-lg text-left">你想删除这个任务吗？</h4>
              <div className="flex self-end gap-2">
                <button
                    className="btn btn-primary text-white mt-5"
                    onClick={() => setDeleteModalOpen(false)}>
                  不要
                </button>
                <button
                    className="btn btn-error bg-red-500 text-white mt-5"
                    onClick={() => handleDeleteTodo(task.id)}>
                  删了
                </button>
              </div>
            </div>
          </Modal>
        </td>
      </tr>
  );
};

export default Task;
