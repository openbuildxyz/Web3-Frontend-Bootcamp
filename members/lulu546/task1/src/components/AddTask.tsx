import React, { FormEventHandler, useState } from 'react';
import { FiPlusCircle } from "react-icons/fi";
import Modal from './Modal';
import { v4 as uuidv4 } from "uuid";
import useTaskStore from '../store/index';
import {addTodo} from "../../api";

const AddTask: React.FC = () => {
  const [addModalOpen, setAddModalOpen] = useState<boolean>(false);
  const [newTaskValue, setNewTaskValue] = useState<string>("");

  const triggerRefresh = useTaskStore(state => state.triggerRefresh);
  
  const handleNewTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await addTodo({
      id: uuidv4(),
      text: newTaskValue,
      isCompleted: false,
    });
    triggerRefresh();
    setNewTaskValue("");
    setAddModalOpen(false);
  };
  
  return (
      <div>
        <button className="btn btn-primary w-full" onClick={() => setAddModalOpen(true)}>
          添加任务<FiPlusCircle size={18} />
        </button>
        
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

export default AddTask;
