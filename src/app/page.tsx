import CreateCategory from '@/components/Category/CreateCategory/CreateCategory';
import ManageCategory from '@/components/Category/ManageCategory/ManageCategory';

// min-h-screen
export default function Home() {
  return (
    <main className='flex flex-col justify-between gap-7 '>
      Work Logger
      <CreateCategory />
      <ManageCategory />
    </main>
  );
}
