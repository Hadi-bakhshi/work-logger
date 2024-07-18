import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

export type Category = {
  id: string;
  name: string;
  color: string | null;
};

export type CategoryState = {
  categories: Category[];
};

export type CategoryAction = {
  add: (name: string, color: string | null) => void;
  delete: (id: string) => void;
  checkIfCategoryExist: (name: string) => boolean;
};

export const useCategoryStore = create<CategoryState & CategoryAction>()(
  persist(
    (set, get) => ({
      categories: [],
      add: (name, color) => {
        const duplicateCategory = get().categories.find((item) => item.name === name);
        if (duplicateCategory) {
          // TODO: Change alert to toast
          alert('Category name exists');
        } else {
          set((state) => ({ categories: [...state.categories, { id: uuidv4(), color, name }] }));
        }
      },
      delete: (id) => set((state) => ({ categories: state.categories.filter((item) => item.id !== id) })),
      checkIfCategoryExist: (name) => {
        const duplicateCategory = get().categories.find((item) => item.name === name);
        return Boolean(duplicateCategory);
      },
    }),
    { name: 'category-store', skipHydration: false }
  )
);
