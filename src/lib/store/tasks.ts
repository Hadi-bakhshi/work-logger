import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import { Category, CategoryState } from './categories';
import toast from 'react-hot-toast';

export type Task = {
  id: string;
  category: Category;
  date: Date;
  description: string;
  from: string;
  to: string;
  title: string;
};

type TaskState = {
  tasks: Task[];
};

type TaskAction = {
  add: (data: Omit<Task, 'id'>) => void;
  stop: (id: string, to: string) => void;
  delete: (id: string) => void;
};

export const useTaskStore = create<TaskState & TaskAction>()(
  persist(
    (set, get) => ({
      tasks: [],
      add: (data) => {
        const clonedState = structuredClone(get().tasks);
        clonedState.push({
          id: uuidv4(),
          ...data,
        });
        set(() => ({ tasks: clonedState }));
      },
      delete: (id) => set((state) => ({ tasks: state.tasks.filter((item) => item.id !== id) })),
      stop: (id, to) => {
        const clonedState = structuredClone(get().tasks);
        const foundTask = clonedState.find((task) => task.id === id);
        if (!foundTask) return toast.error("Oh sorry, couldn't find task with this information");
        foundTask.to = to;
        set(() => ({ tasks: clonedState }));
      },
    }),
    { name: 'task-store' }
  )
);
