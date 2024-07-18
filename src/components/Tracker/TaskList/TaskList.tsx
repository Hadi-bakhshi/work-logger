'use client';
import { Category } from '@/lib/store/categories';
import { Task, useTaskStore } from '@/lib/store/tasks';
import { DateDuration } from '@internationalized/date';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  getKeyValue,
  Button,
} from '@nextui-org/react';
import { useCallback, type Key } from 'react';

const columns = [
  { name: 'Title', uid: 'title' },
  { name: 'Category', uid: 'category' },
  { name: 'Date', uid: 'date' },
  { name: 'From', uid: 'from' },
  { name: 'To', uid: 'to' },
  { name: 'Description', uid: 'description' },
  { name: 'Actions', uid: 'actions' },
];

const TaskList = () => {
  const taskList = useTaskStore((state) => state.tasks);
  const stopTask = useTaskStore((state) => state.stop);
  const deleteTask = useTaskStore((state) => state.delete);

  const renderCell = useCallback((task: Task, columnKey: Key, id: string): JSX.Element => {
    const cellValue = task[columnKey as keyof Task];

    switch (columnKey) {
      case 'title':
        return (
          <div>
            <h6>{cellValue as string}</h6>
          </div>
        );
      case 'category':
        return (
          <div>
            <h6>{(cellValue as Category).name}</h6>
          </div>
        );
      case 'date':
        return (
          <div>
            <h6>{new Date(cellValue as Date).toLocaleDateString('fa-IR', { timeZone: 'Asia/Tehran' })}</h6>
          </div>
        );
      case 'from':
        return (
          <div>
            <h6>{cellValue as string}</h6>
          </div>
        );
      case 'to':
        return (
          <div>
            <h6>{(cellValue as string) || 'In Progress'}</h6>
          </div>
        );
      case 'description':
        return (
          <div>
            <h6>{(cellValue as string) || '-'}</h6>
          </div>
        );
      case 'actions':
        return (
          <div>
            <Button
              variant='flat'
              color='secondary'
              onPress={() =>
                stopTask(id, `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`)
              }
            >
              stop
            </Button>
            <Button variant='light' color='danger' onPress={() => deleteTask(id)}>
              remove
            </Button>
          </div>
        );
      default:
        return <div>{cellValue as string}</div>;
    }
  }, []);

  return (
    <Table isStriped isHeaderSticky aria-label='List of your tasks'>
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.uid} align={column.uid === 'actions' ? 'center' : 'start'}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={taskList.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey, item.id)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default TaskList;
