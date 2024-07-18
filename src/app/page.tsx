import CreateCategory from '@/components/Category/CreateCategory/CreateCategory';
import ManageCategory from '@/components/Category/ManageCategory/ManageCategory';
import AddTask from '@/components/Tracker/AddTask/AddTask';
import TaskList from '@/components/Tracker/TaskList/TaskList';

// min-h-screen
export default function Home() {
  return (
    <main className='flex flex-col justify-between gap-7 '>
      Work Logger
      <CreateCategory />
      <ManageCategory />
      <AddTask />
      <TaskList />
    </main>
  );
}
