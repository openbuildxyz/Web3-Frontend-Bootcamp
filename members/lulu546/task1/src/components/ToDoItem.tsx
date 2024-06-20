import { ITask } from "../../types/tasks";
import { FormEventHandler, useState } from "react";
import { FiCheck,FiEdit, FiTrash2 } from "react-icons/fi";
import Modal from "./Modal";
import { deleteTodo, editTodo } from "../../api";
import useTaskStore from '../store/index';

interface TaskProps {
  task: ITask;
}

const ToDoItem: React.FC<TaskProps> = ({ task }) => {
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [completeModalOpen, setCompleteModalOpen] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<string>(task.text);
  const triggerRefresh = useTaskStore(state => state.triggerRefresh);
  
  const handleEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    await editTodo({
      id: task.id,
      text: taskToEdit,
      isCompleted: false,
    });
    setEditModalOpen(false);
    triggerRefresh();
  }
  
  const handleDeleteTodo = async (id: string) => {
    await deleteTodo(id);
    setDeleteModalOpen(false);
    triggerRefresh();
  }
  
  const handleCompleteTodo = async (task:ITask,isMarkers:boolean) => {
    console.log(task,'1211')
    await editTodo({
      id: task.id,
      text: task.text,
      isCompleted: isMarkers,
    });
    setCompleteModalOpen(false);
    triggerRefresh();
  }
  return (
      <tr key={task.id}>
        <td className="w-full">{task.text}
          {task.isCompleted ? <span className="w-10 bg-green-300 mx-2 text-[0.7rem] p-1 rounded-[4px] text-green-700" >已完成</span>:<span className="w-10 bg-red-300 mx-2 text-[0.7rem] p-1 rounded-[4px] text-red-700" >未完成</span>}
        
        </td>
        <td className="flex gap-5">
          <FiCheck
              className="text-green-500"
              onClick={() => setCompleteModalOpen(true)}
              cursor="pointer"
              size={20}/>
          <Modal modalOpen={completeModalOpen} setModalOpen={setCompleteModalOpen}>
            <h3 className="font-bold text-lg">完成任务</h3>
            <div className="flex flex-col justify-between modal-action">
              <h4 className="text-lg text-left">你想将这个任务标记为？</h4>
              <div className="flex self-end gap-2">
                <button
                    className="btn btn-success text-white mt-5"
                    onClick={() => handleCompleteTodo(task,true)}>
                  已完成
                </button>
                <button
                    className="btn btn-primary  mt-5"
                    onClick={() => handleCompleteTodo(task,false)}>
                  未完成
                </button>
             
              </div>
            </div>
          </Modal>
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

export default ToDoItem;
