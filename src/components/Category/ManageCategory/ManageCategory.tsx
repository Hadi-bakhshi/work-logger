'use client';

import { Delete02Icon } from '@/components/icons';
import { useCategoryStore } from '@/lib/store/categories';
import { Button } from '@nextui-org/react';
import toast from 'react-hot-toast';

const ManageCategory = () => {
  const categoryList = useCategoryStore((state) => state.categories);
  const deleteCategory = useCategoryStore((state) => state.delete);

  const deleteCategoryHandler = (id: string) => {
    deleteCategory(id);
    toast.success('Deleted successfully');
  };

  return (
    <div>
      <h2>Your categories</h2>
      <div className='w-full flex flex-col gap-3'>
        {categoryList.length !== 0 &&
          categoryList.map((category) => {
            return (
              <div key={category.id} className='w-full flex flex-row justify-between p-2 bg-slate-100'>
                <div className='w-full flex flex-row items-center gap-1'>
                  <h6>Name:</h6>
                  <span className='block'>{category.name}</span>
                </div>
                <div className='w-full flex flex-row items-center gap-1'>
                  <h6>Color:</h6>
                  <span className={`w-fit px-2 rounded-md block`} style={{ backgroundColor: category.color || '#ccc' }}>
                    {category.color || 'No color'}
                  </span>
                </div>
                <Button isIconOnly color='danger' variant='light' onPress={() => deleteCategoryHandler(category.id)}>
                  <Delete02Icon />
                </Button>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ManageCategory;
