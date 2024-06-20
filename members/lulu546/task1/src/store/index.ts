import create from 'zustand';
import { ITask } from '../../types/tasks';

interface TaskStore {
    tasks: ITask[];
    refreshFlag: number;
    addTask: (task: ITask) => void;

    triggerRefresh: () => void;
    getAllTodos: () => void;
}

const useTaskStore = create<TaskStore>((set) => ({
    tasks: [],
    refreshFlag: 0,
    addTask: (task: ITask) => {
        set((state) => {
            const newTasks = [...state.tasks, task];
            localStorage.setItem('tasks', JSON.stringify(newTasks));
            return { tasks: newTasks, refreshFlag: state.refreshFlag + 1 };
        });
    },
    triggerRefresh: () => {
        set((state) => ({ refreshFlag: state.refreshFlag + 1 }));
    },
    getAllTodos: () => {
        const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        set(() => ({ tasks }));
    },
}));

export default useTaskStore;
