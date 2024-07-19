'use client';

import { ColDef } from 'ag-grid-community';

// import { Category } from '@/lib/store/categories';
import { Task, useTaskStore } from '@/lib/store/tasks';
import { Button } from '@nextui-org/react';
import NyxAgGrid from '@/components/AgGrid/NyxAgGrid';

const TaskList = () => {
  const taskList = useTaskStore((state) => state.tasks);
  const stopTask = useTaskStore((state) => state.stop);
  const deleteTask = useTaskStore((state) => state.delete);
  console.log({ taskList });
  const columns: ColDef[] = [
    {
      field: 'title',
      headerName: 'Title',
      flex: 1,
      minWidth: 200,
      cellRenderer: (input: ColDef['cellRenderer']) => {
        return (
          <div className='flex justify-start items-center h-full'>
            <h6>{input.data.title}</h6>
          </div>
        );
      },
    },
    {
      field: 'category',
      headerName: 'Category',
      flex: 1,
      minWidth: 200,
      cellRenderer: (input: ColDef['cellRenderer']) => {
        return (
          <div className='flex justify-center items-center h-full'>
            <h6>{input.data.category.name}</h6>
          </div>
        );
      },
    },
    {
      field: 'date',
      headerName: 'Date',
      flex: 1,
      minWidth: 70,
      // valueFormatter:(v) => v.value,
      cellRenderer: (input: ColDef['cellRenderer']) => {
        return (
          <div className='flex justify-center items-center h-full'>
            <h6>{new Date(input.data.date as Date).toLocaleDateString('fa-IR', { timeZone: 'Asia/Tehran' })}</h6>
          </div>
        );
      },
    },
    {
      field: 'from',
      headerName: 'From',
      flex: 1,
      minWidth: 70,
      cellRenderer: (input: ColDef['cellRenderer']) => {
        return (
          <div className='flex justify-center items-center h-full'>
            <h6>{input.data.from}</h6>
          </div>
        );
      },
    },
    {
      field: 'to',
      headerName: 'To',
      flex: 1,
      minWidth: 70,
      cellRenderer: (input: ColDef['cellRenderer']) => {
        return (
          <div className='flex justify-center items-center h-full'>
            <h6>{input.data.to || 'In Progress'}</h6>
          </div>
        );
      },
    },
    {
      field: 'description',
      headerName: 'Description',
      flex: 1,
      minWidth: 200,
      cellRenderer: (input: ColDef['cellRenderer']) => {
        return (
          <div className='flex justify-center items-center h-full'>
            <h6>{input.data.description || '-'}</h6>
          </div>
        );
      },
    },
    {
      headerName: 'Actions',
      flex: 1,
      minWidth: 200,
      pinned: 'right',
      lockPinned: true,
      cellRenderer: (input: ColDef['cellRenderer']) => {
        return (
          <div className='flex justify-center items-center h-full'>
            <Button
              variant='flat'
              color='secondary'
              onPress={() =>
                stopTask(
                  input.data.id,
                  `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
                )
              }
            >
              stop
            </Button>
            <Button variant='light' color='danger' onPress={() => deleteTask(input.data.id)}>
              remove
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div className='w-full h-[800px] flex justify-center items-center gap-4 p-4'>
      <div className='ag-theme-quartz w-full h-full'>
        <NyxAgGrid
          toolbar
          pagination
          paginationAutoPageSize
          rowHeight={50}
          agGridClassName={
            // theme.themeId === ThemesTypes.DARK ? 'ag-theme-alpine-dark' :
            'ag-theme-alpine'
          }
          search={true}
          // loading={agencyUserDataLoading}
          rows={taskList || []}
          columns={columns}
          // CTAComponent={
          //   <Button
          //     color='success'
          //     className='text-white'
          //     onClick={() => {
          //       onOpenAgencyUserCreate();
          //     }}
          //   >
          //     <span>افزودن کاربر</span>
          //     <span className='text-2xl'>+</span>
          //   </Button>
          // }
        />
      </div>
    </div>
  );
};

export default TaskList;
